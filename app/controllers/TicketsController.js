const TicketDAO = require('../dao/TicketDAO');
const { currentUser } = require('../helpers/UserHelpers');

class TicketsController {
  index(req, res, next) {
    currentUser(req).then((user) => {
      res.json({
        status: 'ok',
        message: `Tickets for user ${user.username}`
      });
    });
  }

  create(req, res, next) {
    currentUser(req).then((user) => {
      const ticket = {
        title: req.body.title,
        description: req.body.description,
        status: 'opened',
        customer_id: user.id
      };

      const dao = new TicketDAO();
      const ticket_id = dao.save(ticket);
      res.json({
        status: 'ok',
        message: 'Ticket saved'
      });
    });
  }
}

module.exports = TicketsController;
