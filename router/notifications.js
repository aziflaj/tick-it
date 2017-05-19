const router = require('express').Router();

const NotificationsController = require('../app/controllers/notifications_controller');
const notifications = new NotificationsController();

const NotificationsPolicy = require('../app/policies/notifications_policy');
const policy = new NotificationsPolicy();

const { unauthorized } = require('../lib/response');
const { isLoggedIn } = require('../app/helpers/user_helpers');

router.get('/unread', (req, res, next) => {
  if (isLoggedIn(req)) {
    notifications.showUnread(req, res, next);
  } else {
    unauthorized(res);
  }
});

router.get('/all', (req, res, next) => {
  if (isLoggedIn(req)) {
    notifications.showAll(req, res, next);
  } else {
    unauthorized(res);
  }
});

router.put('/readall', (req, res, next) => {
  if (isLoggedIn(req)) {
    notifications.markAllAsRead(req, res, next);
  } else {
    unauthorized(res);
  }
});

router.put('/:notification_id/read', (req, res, next) => {
  if (!isLoggedIn(req)) {
    unauthorized(res);
  }

  policy.canRead(req).then(ok => {
    if(ok) {
      notifications.markAsRead(req, res, next);
    } else {
      unauthorized(res);
    }
  });
});

module.exports = router;
