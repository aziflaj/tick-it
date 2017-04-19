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

      dao.save(ticket).then((ticket_id) => {
        res.json({
          status: 'ok',
          message: `Ticket saved with id ${ticket_id}`
        });
      }).catch((error) => {
        res.json({
          status: 'error',
          message: 'Some issue occurred'
        });
      });
    });
  }
}

module.exports = TicketsController;
