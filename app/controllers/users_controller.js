const UserDAO = require('../dao/user_dao');
const { toJson } = require('../helpers/user_helpers');

const userDao = new UserDAO();

class UsersController {
  show(req, res, next) {
    userDao.getByUsername(req.params.username).then(user => {
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
      full_name: req.body.full_name,
      role: req.body.role || 'customer'
    };

    userDao.save(user).then(user_id => {
      res.json({
        status: 'ok',
        message: `User saved with id ${user_id}`
      });
    }).catch(errors => {
        console.log(errors);
        res.json({
          status: 'error',
          message: 'Some issue occurred'
        });
    });
  }

  update(req, res, next) {
    const username = req.params.username;
    const data = {
      username: req.body.username,
      email: req.body.email,
      full_name: req.body.full_name
    };

    userDao.update(username, data).then(results => {
      res.json({
        status: 'ok',
        message: 'User updated'
      });
    });
  }

  destroy(req, res, next) {
    const username = req.params.username;
    userDao.delete(username).then(results => {
      res.json({
        status: 'ok',
        message: `User ${username} deleted`
      });
    });
  }
}

module.exports = UsersController;
