const Redis = require('ioredis');
const publisher = new Redis(process.env.PUB_URL);

const db = require('../../lib/db');

const NotificationDAO = require('../dao/notification_dao');
const notificationDao = new NotificationDAO();
const TicketDAO = require('../dao/ticket_dao');
const ticketDao = new TicketDAO();

class NotificationJob {
  static perform(type, params) {
    switch (type) {
      case 'assign_supporter':
        this.notifyCustomer(params.ticket_id);
        break;

      case 'admin_assign':
        this.notifyAdminAssignment(params.ticket_id);
        break;

      case 'admin_unassign':
        NotificationJob.notifyUnassignment(params.ticket_id, params.supporter_id);
        break;

      case 'close_ticket':
        this.notifyClosedTicket(params.ticket_id, params.user_id);
        break;

      case 'comment':
        this.notifyNewComment(params.comment_id);
        break;

      default:
        throw new Error('Unknown notification type');
    }
  }


  static notifyCustomer(ticket_id) {
    db.hgetall(`ticket:${ticket_id}`).then(ticket => {
      db.hgetall(`user:${ticket.supporter_id}`).then(supporter => {
        const message = `Ticket #${ticket.id} was assigned to supporter ${supporter.username}.`;
        sendNotification(ticket.customer_id, ticket.id, message);
      });
    });
  }

  static notifyAdminAssignment(ticket_id) {
    db.hgetall(`ticket:${ticket_id}`).then(ticket => {
      // Notify supporter
      db.hgetall(`user:${ticket.customer_id}`).then(customer => {
        const message = `Ticket #${ticket.id} created by ${customer.username} was assigned to you.`;
        sendNotification(ticket.supporter_id, ticket.id, message);
      });

      // Notify customer
      db.hgetall(`user:${ticket.supporter_id}`).then(supporter => {
        const message = `Ticket #${ticket.id} was assigned to supporter ${supporter.username}.`;
        sendNotification(ticket.customer_id, ticket.id, message);
      });
    });
  }

  static notifyClosedTicket(ticket_id, user_id) {
    db.hgetall(`ticket:${ticket_id}`).then(ticket => {
      const message = `Ticket #${ticket.id} was marked as closed.`;

      if (ticket.supporter_id == user_id) {
        sendNotification(ticket.customer_id, ticket.id, message);
      } else if (ticket.customer_id == user_id) {
        sendNotification(ticket.supporter, ticket.id, message);
      }
    });
  }

  static notifyNewComment(comment_id) {
    db.hgetall(`comment:${comment_id}`).then(comment => {
      ticketDao.getById(comment.ticket_id).then(ticketData => {
        const ticket = ticketData.ticket;
        const comments = ticketData.comments;

        const userIds = comments.map(c => c.author_id).filter(id => {
          const invalidIds = [comment.author_id, ticket.supporter_id, ticket.customer_id];
          return invalidIds.indexOf(id) !== -1;
        })

        if (comment.author_id === ticket.customer_id) {
          userIds.push(ticket.supporter_id);
        } else if (comment.author_id === ticket.supporter_id) {
          userIds.push(ticket.customer_id);
        }

        db.hgetall(`user:${comment.author_id}`).then(user => {
          const message = `${user.full_name} commented on Ticket #${ticket.id}.`;
          userIds.forEach(uid => sendNotification(uid, ticket.id, message));
        });
      });
    });
  }

  static notifyUnassignment(ticket_id, supporter_id) {
    db.hgetall(`ticket:${ticket_id}`).then(t => {
      db.hgetall(`user:${supporter_id}`).then(s => {
        const customerMessage = `Ticket #${t.id} was unassigned from supporter ${s.username}.`;
        sendNotification(t.customer_id, t.id, customerMessage);
      });

      const messageForSupport = `Ticket #${t.id} was unassigned from you.`;
      sendNotification(supporter_id, t.id, messageForSupport);
    });
  }
}

function sendNotification(user_id, ticket_id, message) {
  const notification = {
    user_id: user_id,
    message: message,
    ticket_id: ticket_id
  };

  notificationDao.save(notification).then(id => {
    publisher.publish('notifications', id);
  });
}

module.exports = NotificationJob;
