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
          id: ticket_id
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
      status: req.body.status,
      agent_id: req.body.agent_id
    };

    ticketDao.update(req.params.id, ticket).then(data => {
      res.json({
        status: 'ok',
        id: req.params.id
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
