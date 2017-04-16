const bcrypt = require('bcrypt');

const UserDAO = require('../dao/UserDAO.js');
const JsonWebToken = require('../../lib/jwt.js');

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
            user: {
              id: user.id,
              username: user.username,
              full_name: user.full_name
            }
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
