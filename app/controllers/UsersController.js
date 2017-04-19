const UserDAO = require('../dao/UserDAO');
const { toJson } = require('../helpers/UserHelpers');

class UsersController {
  show(req, res, next) {
    const dao = new UserDAO();
    dao.getByUsername(req.params.username).then((user) => {
      res.json({
        status: 'ok',
        user: toJson(user)
      });
    });
  }

  create(req, res, next) {
    const user = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      full_name: req.body.full_name
    };

    const dao = new UserDAO();
    const user_id = dao.save(user);
    res.json({
      status: 'ok',
      message: 'User created'
    });
  }
}

module.exports = UsersController;
