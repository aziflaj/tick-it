const db = require('../../lib/db');

const NotificationDAO = require('../dao/notification_dao');
const notificationDao = new NotificationDAO();

class NotificationJob {
  static notifyCustomer(ticket_id) {
    db.hgetall(`ticket:${ticket_id}`).then(ticket => {
      db.hgetall(`user:${ticket.supporter_id}`).then(supporter => {
        const notification = {
          user_id: ticket.customer_id,
          message: `Ticket #${ticket.id} was assigned to supporter ${supporter.full_name}.`
        };
        notificationDao.save(notification).then(notification_id => {
          console.log(`on job ${notification_id}`);
          db.publish('notifications', notification_id);
        });
      });
    });
  }
}

module.exports = NotificationJob;
