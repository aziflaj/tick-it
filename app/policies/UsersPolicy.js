const UserDAO = require('../dao/UserDAO');
const { currentUser } = require('../helpers/UserHelpers');

class TicketsPolicy {
  canDelete(req) {
    const dao = new UserDAO();
    return currentUser(req).then((cUser) => {
      return dao.getByUsername(req.params.username).then((user) => {
        return cUser.role === 'admin' || cUser.username === user.username;
      });
    });
  }
}

module.exports = TicketsPolicy;
