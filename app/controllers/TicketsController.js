const User = require('../models/User.js');
const { currentUser } = require('../helpers/UserHelpers.js');

class TicketsController {
  index(req, res, next) {
    currentUser(req).then((u) => {
      const user = new User(u);
      res.json({
        status: 'ok',
        message: `Tickets for user ${user.username}`
      });
    });
  }

  create(req, res, next) {
    currentUser(req).then((u) => {
      const user = new User(u);
      // TODO: store ticket
      // TODO: return ticket id + data
    });
  }
}

module.exports = TicketsController;
