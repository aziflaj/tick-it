const bcrypt = require('bcrypt');

const UserDAO = require('../dao/user_dao');
const JsonWebToken = require('../../lib/jwt');
const { toJson } = require('../helpers/user_helpers');

class AuthenticationController {
  authenticate(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const dao = new UserDAO();

    dao.getByUsername(username).then((user) => {
      bcrypt.compare(password, user.password).then((matching) => {
        if (matching) {
          res.json({
            status: 'ok',
            token: JsonWebToken.sign({id: user.id, username: user.username}),
            user: toJson(user)
          });
        } else {
          res.json({
            status: 'error',
            message: 'Invalid username or password'
          });
        }
      });
    });
  }
}

module.exports = AuthenticationController;
