const router = require('express').Router();

const NotificationsController = require('../app/controllers/notifications_controller');
const notifications = new NotificationsController();

const { unauthorized } = require('../lib/response');
const { isLoggedIn } = require('../app/helpers/user_helpers');

router.get('/', (req, res, next) => {
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

module.exports = router;
