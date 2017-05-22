const UserDAO = require('../dao/user_dao');
const { toJson } = require('../helpers/user_helpers');
const bcrypt = require('bcrypt');


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

  changePassword(req, res, next) {
    const username = req.params.username;
    const data = {
      currentPass: req.body.currentPass,
      newPass: req.body.newPass
    };

    return userDao.getByUsername(username).then(user => {
      return bcrypt.compare(data.currentPass, user.password).then(match => {
        if (match) {
          userDao.changePassword(username, data).then(results => {
            res.json({
              status: 'ok',
              message: 'User updated'
            });
          });
        } else {
          res.json({
            status: 'error',
            message: 'incorrect password'
          });
        }
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

  supporters() {
    userDao.getSupporters().then(supporters => {
      res.json({
        status: 'ok',
        supporters: supporters
      });
    });
  }
}

module.exports = UsersController;
