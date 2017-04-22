const TicketDAO = require('../dao/TicketDAO');
const { currentUser } = require('../helpers/UserHelpers');
const { toJson } = require('../helpers/TicketHelpers');

class TicketsController {
  index(req, res, next) {
    currentUser(req).then((user) => {
      res.json({
        status: 'ok',
        message: `Tickets for user ${user.username}`
      });
    });
  }

  show(req, res, next) {
    const dao = new TicketDAO();
    dao.getById(req.params.id).then((ticket) => {
      res.json({
        status: 'ok',
        ticket: toJson(ticket)
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
          console.log(errors);
          res.json({
            status: 'error',
            message: 'Some issue occurred'
          });
      });
    });
  }

  update(req, res, next) {
    const ticket = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status
    };
    const dao = new TicketDAO();
    dao.update(req.params.ticket_id, ticket).then((result) => {
      res.json({
        status: 'ok',
        ticket: ticket
      });
    });
  }

  delete(req, res, next) {
    const ticketId = req.params.ticket_id;
    const dao = new TicketDAO();
    dao.delete(ticketId).then((result) => {
      res.json({
        status: 'ok',
        message: `Ticket ${ticketId} deleted`
      })
    })
  }
}

module.exports = TicketsController;
