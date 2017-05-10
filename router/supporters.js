const router = require('express').Router();

const UsersController = require('../app/controllers/users_controller');
const users = new UsersController();
const UsersPolicy = require('../app/policies/users_policy');
const policy = new UsersPolicy();

const { unauthorized } = require('../lib/response');
const { isLoggedIn } = require('../app/helpers/user_helpers');


router.get('/', (req, res, next) => {
  if (isLoggedIn(req) && policy.isAdmin(req)) {
    users.supporters
  } else {
    unauthorized(res);
  }
});

// router.post('/', users.create);
//
// router.delete('/:username', (req, res, next) => {
//   if (!isLoggedIn(req)) {
//     unauthorized(res);
//   }
//
//   policy.canModify(req).then(ok => {
//     if (ok) {
//       users.destroy(req, res, next);
//     } else {
//       unauthorized(res);
//     }
//   });
// });

module.exports = router;
