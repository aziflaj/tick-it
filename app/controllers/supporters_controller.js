const UserDAO = require('../dao/user_dao');
const { toJson } = require('../helpers/user_helpers');

const userDao = new UserDAO();

class SupportersController {
  index(req, res, next) {
    userDao.getSupporters().then(result => {
      res.json({
        status: 'ok',
        supporters: result.supporters,
        pages: result.pages,
        currentPage: result.currentPage
      });
    });
  }

  search(req, res, next) {
    userDao.searchSupporter(req.query.term).then(supporters => {
      res.json({
        status: 'ok',
        supporters: supporters
      });
    });
  }
}

module.exports = SupportersController;
