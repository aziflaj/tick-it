const UserDAO = require('../dao/user_dao');
const { currentUser } = require('../helpers/user_helpers');

class UsersPolicy {
  canModify(req) {
    const dao = new UserDAO();
    return currentUser(req).then(cUser => {
      return dao.getByUsername(req.params.username).then(user => {
        return cUser.role === 'admin' || cUser.username === user.username;
      });
    });
  }

  isAdmin(req) {
    return currentUser(req).then(cUser => {
      return user.role === 'admin';
    });
  }
}

module.exports = UsersPolicy;
