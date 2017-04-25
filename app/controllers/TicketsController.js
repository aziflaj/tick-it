const TicketDAO = require('../dao/TicketDAO');
const { currentUser } = require('../helpers/UserHelpers');
const { toJson } = require('../helpers/TicketHelpers');

const ticketDao = new TicketDAO();

class TicketsController {
  index(req, res, next) {
    currentUser(req).then((user) => {
      ticketDao.ticketsForUser(user).then((tickets) => {
        res.json({
          status: 'ok',
          tickets: tickets
        });
      });
    });
  }

  show(req, res, next) {
    ticketDao.getById(req.params.id).then((ticket) => {
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

      ticketDao.save(ticket).then((ticket_id) => {
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

  destroy(req, res, next) {
    const ticketId = req.params.id;

    ticketDao.delete(ticketId).then((result) => {
      res.json({
        status: 'ok',
        message: `Ticket ${ticketId} deleted`
      })
    })
  }
}

module.exports = TicketsController;
