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
        const notification = {
          user_id: ticket.customer_id,
          message: `Ticket #${ticket.id} was assigned to supporter ${supporter.username}.`,
          ticket_id: ticket.id
        };

        notificationDao.save(notification).then(notification_id => {
          publisher.publish('notifications', notification_id);
        });
      });
    });
  }

  static notifyUnassignmentCustomer(ticket_id) {
    db.hgetall(`ticket:${ticket_id}`).then(ticket => {
      db.hgetall(`user:${ticket.supporter_id}`).then(supporter => {
        const notification = {
          user_id: ticket.customer_id,
          message: `Ticket #${ticket.id} was unassigned from supporter ${supporter.username}.`,
          ticket_id: ticket.id
        };

        notificationDao.save(notification).then(notification_id => {
          publisher.publish('notifications', notification_id);
        });
      });
    });
  }

  static notifyAssignmentSupport(ticket_id) {
    db.hgetall(`ticket:${ticket_id}`).then(ticket => {
      db.hgetall(`user:${ticket.customer_id}`).then(customer => {
        const notification = {
          user_id: ticket.supporter_id,
          message: `Ticket #${ticket.id} created by ${customer.username} was assigned to you.`,
          ticket_id: ticket.id
        };

        console.log(ticket);

        notificationDao.save(notification).then(notification_id => {
          publisher.publish('notifications', notification_id)
        });
      });
    });
  }

  static notifyUnassignmentSupport(ticket_id) {
    db.hgetall(`ticket:${ticket_id}`).then(ticket => {
      const notification = {
        user_id: ticket.supporter_id,
        message: `Ticket #${ticket.id} was unassigned from you.`,
        ticket_id: ticket.id
      };

      notificationDao.save(notification).then(notification_id => {
        publisher.publish('notifications', notification_id)
      });
    });
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
      const notification = {
        message: `Ticket #${ticket.id} was marked as closed.`,
        ticket_id: ticket.id
      };

      if(ticket.supporter_id == user_id) {
        notification.user_id = ticket.customer_id;
      } else if(ticket.customer_id == user_id) {
        notification.user_id = ticket.supporter_id;
      }

      notificationDao.save(notification).then(notification_id => {
        publisher.publish('notifications', notification_id);
      });
    });
  }
}

module.exports = NotificationJob;
