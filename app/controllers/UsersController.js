const UserDAO = require('../dao/UserDAO');
const { toJson } = require('../helpers/UserHelpers');

const userDao = new UserDAO();

class UsersController {
  show(req, res, next) {
    userDao.getByUsername(req.params.username).then((user) => {
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

    userDao.save(user).then((user_id) => {
      res.json({
        status: 'ok',
        message: `User saved with id ${user_id}`
      });
    }).catch((error) => {
        console.log(errors);
        res.json({
          status: 'error',
          message: 'Some issue occurred'
        });
    });
  }

  destroy(req, res, next) {
    const username = req.params.username;
    userDao.delete(username).then((results) => {
      res.json({
        status: 'ok',
        message: `User ${username} deleted`
      });
    });
  }
}

module.exports = UsersController;
