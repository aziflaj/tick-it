const UserDAO = require('../dao/user_dao');
const { toJson } = require('../helpers/user_helpers');

const userDao = new UserDAO();

class SupportersController {
  index(req, res, next) {
    userDao.getSupporters().then(supporters => {
      res.json({
        status: 'ok',
        supporters: supporters
      });
    });
  }
}

module.exports = SupportersController;
