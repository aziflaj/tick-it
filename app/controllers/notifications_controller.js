const NotificationDAO = require('../dao/notification_dao');
const { currentUser } = require('../helpers/user_helpers');

const notificationDao = new NotificationDAO();

class NotificationsController {
  showAll(req, res, next) {
    currentUser(req).then(user => {
      notificationDao.getAllByUserId(user.id).then(notifications => {
        res.json({
          status: 'ok',
          notifications: notifications
        });
      });
    });
  }

  showUnread(req, res, next) {
  }

  markAsRead(req, res, next) {
  }

  markAllAsRead(req, res, next) {
  }
}

module.exports = NotificationsController;
