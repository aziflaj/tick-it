const JsonWebToken = require('../../lib/jwt.js');
const UserDAO = require('../dao/UserDAO.js');
const User = require('../models/User.js');

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

module.exports.currentUser = currentUser;
