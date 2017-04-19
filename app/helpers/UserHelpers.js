const JsonWebToken = require('../../lib/jwt');
const UserDAO = require('../dao/UserDAO');

function currentUser(req) {
  const token = req.get('Authorization').split(' ')[1];
  try {
    const decoded = JsonWebToken.verify(token);
    const dao = new UserDAO();
    return dao.getByUsername(decoded.username);
  } catch (error) {
    console.log(error);
    return null;
  }
}

function toJson(user) {
  return {
    id: user.id,
    username: user.username,
    full_name: user.full_name,
    email: user.email
  };
}

module.exports.currentUser = currentUser;
module.exports.toJson = toJson;
