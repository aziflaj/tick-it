const TicketDAO = require('../dao/TicketDAO');
const JsonWebToken = require('../../lib/jwt');
const { currentUser } = require('../helpers/UserHelpers');

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

  canDelete(req) {
    const dao = new TicketDAO();
    return currentUser(req).then((user) => {
      return dao.getById(req.params.id).then((ticket) => ticket.customer_id == user.id);
    });
  }
}

module.exports = TicketsPolicy;
