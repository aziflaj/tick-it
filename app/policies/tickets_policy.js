const TicketDAO = require('../dao/ticket_dao');
const { isLoggedIn, currentUser } = require('../helpers/user_helpers');

class TicketsPolicy {
  canCreate(req) {
    return isLoggedIn(req);
  }

  canDelete(req) {
    const dao = new TicketDAO();
    return currentUser(req).then(user => {
      return dao.getById(req.params.id).then(ticket => ticket.customer_id == user.id);
    });
  }

  canUpdate(req) {
    const dao = new TicketDAO();
    return currentUser(req).then(user => {
      return dao.getById(req.params.id).then(ticket => ticket.customer_id == user.id || ticket.agent_id == user.id);
    });
  }
}

module.exports = TicketsPolicy;
