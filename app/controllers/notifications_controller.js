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
    notificationDao.markAsRead(req.params.notification_id).then(result => {
      res.json({
        status: 'ok',
        message: `Notification marked as read.`
      });
    })
  }

  markAllAsRead(req, res, next) {
    currentUser(req).then(user => {
      notificationDao.getAllByUserId(user.id).then(notifications => {
        notifications.map(notification => {
          notificationDao.markAsRead(notification.id);
        });
        res.json({
          status: 'ok',
          message: `All notifications were marked as read.`
        });
      });
    });
  }
}

module.exports = NotificationsController;
