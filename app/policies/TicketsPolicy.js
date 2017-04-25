const TicketDAO = require('../dao/TicketDAO');
const { isLoggedIn, currentUser } = require('../helpers/UserHelpers');

class TicketsPolicy {
  canCreate(req) {
    return isLoggedIn(req);
  }

  canDelete(req) {
    const dao = new TicketDAO();
    return currentUser(req).then((user) => {
      return dao.getById(req.params.id).then((ticket) => ticket.customer_id == user.id);
    });
  }
}

module.exports = TicketsPolicy;
