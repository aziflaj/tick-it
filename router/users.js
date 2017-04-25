const router = require('express').Router();

const UsersController = require('../app/controllers/UsersController');
const users = new UsersController();
const UsersPolicy = require('../app/policies/UsersPolicy');
const policy = new UsersPolicy();

const { unauthorized } = require('../lib/response');
const { isLoggedIn } = require('../app/helpers/UserHelpers');

router.get('/:username', users.show);

router.post('/', users.create);

router.delete('/:username', (req, res, next) => {
  if (!isLoggedIn(req)) {
    unauthorized(res);
  }

  policy.canDelete(req).then((ok) => {
    if (ok) {
      users.destroy(req, res, next);
    } else {
      unauthorized(res);
    }
  });
});

module.exports = router;
