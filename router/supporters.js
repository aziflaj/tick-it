const router = require('express').Router();

const SupportersController = require('../app/controllers/supporters_controller');
const supporters = new SupportersController();

const UsersPolicy = require('../app/policies/users_policy');
const policy = new UsersPolicy();

const { unauthorized } = require('../lib/response');
const { isLoggedIn } = require('../app/helpers/user_helpers');

router.get('/', (req, res, next) => {
  if (isLoggedIn(req) && policy.isAdmin(req)) {
    supporters.index(req, res, next);
  } else {
    unauthorized(res);
  }
});

module.exports = router;
