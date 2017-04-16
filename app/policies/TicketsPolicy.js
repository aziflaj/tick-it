const JsonWebToken = require('../../lib/jwt.js');

class TicketsPolicy {
  isAllowed(req) {
    const token = req.get('Authorization').split(' ')[1];
    try {
      const decoded = JsonWebToken.verify(token);
      return decoded.username == req.params.username;
    } catch (error) {
      return false;
    }
  }
}

module.exports = TicketsPolicy;
