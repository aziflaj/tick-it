const db = require('../../lib/db.js');
const TicketDAO = require('../dao/ticket_dao');
const { isLoggedIn, currentUser } = require('../helpers/user_helpers');

class TicketsPolicy {
  canCreate(req) {
    return isLoggedIn(req);
  }

  canDelete(req) {
    const dao = new TicketDAO();
    return currentUser(req).then(user => {
      return dao.getById(req.params.id).then(ticket => ticket.ticket.customer_id === user.id);
    });
  }

  canUpdate(req) {
    const dao = new TicketDAO();
    return currentUser(req).then(user => {
      return dao.getById(req.params.id).then(ticket => ticket.customer_id == user.id || ticket.agent_id == user.id);
    });
  }

  canDeleteComment(req) {
    const dao = new TicketDAO();
    return currentUser(req).then(user => {
      return dao.getById(req.params.ticket_id).then(ticket => {
        const comment = findCommentById(ticket.comments, req.params.comment_id);
        return ticket.ticket.customer_id === user.id
               && comment !== null
               && (comment.author_id === user.id || user.role === 'admin');
      });
    });
  }
}

function findCommentById(comments, id) {
  for (let i = 0; i < comments.length; i++) {
    if (comments[i].id === id) {
      return comments[i];
    }
  }
  return null;
}

module.exports = TicketsPolicy;
