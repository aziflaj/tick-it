const db = require('../../lib/db.js');
const NotificationDAO = require('../dao/notification_dao');
const { isLoggedIn, currentUser } = require('../helpers/user_helpers');

class NotificationsPolicy {
  canRead(req) {
    const dao = new NotificationDAO();
    return currentUser(req).then(user => {
      return db.hgetall(`notification:${req.params.notification_id}`).then(notification => {
        return notification.user_id == user.id;
      });
    });
  }
}

module.exports = NotificationsPolicy;
