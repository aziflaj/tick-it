const Redis = require('ioredis');
const publisher = new Redis(process.env.PUB_URL);

const db = require('../../lib/db');

const NotificationDAO = require('../dao/notification_dao');
const notificationDao = new NotificationDAO();
const TicketDAO = require('../dao/ticket_dao');
const ticketDao = new TicketDAO();

class NotificationJob {
  static notifyCustomer(ticket_id) {
    db.hgetall(`ticket:${ticket_id}`).then(ticket => {
      db.hgetall(`user:${ticket.supporter_id}`).then(supporter => {
        const message = `Ticket #${ticket.id} was assigned to supporter ${supporter.username}.`;
        sendNotification(ticket.supporter_id, ticket.id, message);
      });
    });
  }

  static notifyUnassignmentCustomer(ticket_id) {
    db.hgetall(`ticket:${ticket_id}`).then(ticket => {
      db.hgetall(`user:${ticket.supporter_id}`).then(supporter => {
        const message = `Ticket #${ticket.id} was unassigned from supporter ${supporter.username}.`;
        sendNotification(ticket.supporter_id, ticket.id, message);
      });
    });
  }

  static notifyAssignmentSupport(ticket_id) {
    db.hgetall(`ticket:${ticket_id}`).then(ticket => {
      db.hgetall(`user:${ticket.customer_id}`).then(customer => {
        const message = `Ticket #${ticket.id} created by ${customer.username} was assigned to you.`;
        sendNotification(ticket.supporter_id, ticket.id, message);
      });
    });
  }

  static notifyUnassignmentSupport(ticket_id, supporter_id) {
    const message = `Ticket #${ticket.id} was unassigned from you.`;
    sendNotification(supporter_id, ticket.id, message);
  }

  static notifyNewComment(comment_id) {
    db.hgetall(`comment:${comment_id}`).then(comment => {
      ticketDao.getById(comment.ticket_id).then(ticket => {
        const notification = {
          ticket_id: ticket.id
        };
        const comments = ticket.comments;
        const users = comments.map(c => c.author_id)
                              .filter(id => id != comment.author_id
                                         && id != ticket.ticket.supporter_id
                                         && id != ticket.ticket.customer_id);
        if(comment.author_id === ticket.ticket.customer_id) {
          users.push(ticket.ticket.supporter_id);
        } else if(comment.author_id === ticket.ticket.supporter_id) {
          users.push(ticket.ticket.customer_id);
        }

        db.hgetall(`user:${comment.author_id}`).then(user => {
          notification.message = `${user.full_name} commented on Ticket #${ticket.ticket.id}.`;
        });

        users.forEach(uid => {
          notification.user_id = uid;
          notificationDao.save(notification).then(notification_id => {
            publisher.publish('notifications', notification_id);
          });
        });
      });
    });
  }

  static notifyClosedTicket(ticket_id, user_id) {
    db.hgetall(`ticket:${ticket_id}`).then(ticket => {
      const message = `Ticket #${ticket.id} was marked as closed.`;

      if(ticket.supporter_id == user_id) {
        sendNotification(ticket.customer_id, ticket.id, message);
      } else if(ticket.customer_id == user_id) {
        sendNotification(ticket.supporter, ticket.id, message);
      }
    });
  }
}

function sendNotification(user_id, ticket_id, message) {
  const notification = {
    user_id: user_id,
    message: message,
    ticket_id: ticket_id
  };

  notificationDao.save(notification).then(notification_id => {
    publisher.publish('notifications', notification_id)
  });
}

module.exports = NotificationJob;
