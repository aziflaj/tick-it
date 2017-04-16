const UserDAO = require('../dao/UserDAO');

class UsersController {
  show(req, res, next) {
    const dao = new UserDAO();
    const user = dao.getById(req.params.id).then((user) => {
      res.json({
        status: 'ok',
        user: user
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
      message: `Saved user with id ${user_id}`
    });
  }
}

module.exports = UsersController;
