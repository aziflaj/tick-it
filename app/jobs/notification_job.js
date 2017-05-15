const db = require('../../lib/db');

const NotificationDAO = require('../dao/notification_dao');
const notificationDao = new NotificationDAO();

class NotificationJob {
  static notifyCustomer(ticket_id) {
    db.hgetall(`ticket:${ticket_id}`).then(ticket => {
      db.hgetall(`user:${ticket.supporter_id}`).then(supporter => {
        const notification = {
          user_id: ticket.customer_id,
          message: `Ticket #${ticket.id} was assigned to supporter ${supporter.full_name}.`,
          ticket_id: ticket.id
        };
        notificationDao.save(notification).then(notification_id => console.log(notification_id));
      });
    });
  }
}

module.exports = NotificationJob;
