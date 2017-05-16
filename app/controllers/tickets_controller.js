const TicketDAO = require('../dao/ticket_dao');
const NotificationJob = require('../jobs/notification_job');
const { currentUser } = require('../helpers/user_helpers');
const { toJson } = require('../helpers/ticket_helpers');

const ticketDao = new TicketDAO();

class TicketsController {
  index(req, res, next) {
    currentUser(req).then(user => {
      if (user.role === 'customer') {
        ticketDao.ticketsForCustomer(user).then(tickets => {
          res.json({
            status: 'ok',
            tickets: tickets
          });
        });
      } else if (user.role === 'supporter') {
        if (req.query.type === 'mine') {
          ticketDao.ticketsForSupporter(user).then(tickets => {
            res.json({
              status: 'ok',
              tickets: tickets
            });
          });
        } else {
          ticketDao.unassignedTickets().then(tickets => {
            res.json({
              status: 'ok',
              tickets: tickets
            });
          });
        }
      }
    });
  }

  show(req, res, next) {
    ticketDao.getById(req.params.id).then(ticket => {
      res.json({
        status: 'ok',
        ticket: ticket
      });
    });
  }

  create(req, res, next) {
    currentUser(req).then(user => {
      const ticket = {
        title: req.body.title,
        description: req.body.description,
        status: 'opened',
        customer_id: user.id
      };

      ticketDao.save(ticket).then(ticket_id => {
        res.json({
          status: 'ok',
          id: ticket_id
        });
      }).catch(error => {
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
      supporter_id: req.body.supporter_id
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

    ticketDao.delete(ticketId).then(result => {
      console.log(result);
      res.json({
        status: 'ok',
        message: `Ticket ${ticketId} deleted`
      })
    });
  }

  assign(req, res, next) {
    currentUser(req).then(user => {
      ticketDao.assignToSupporter(req.params.ticket_id, user.id).then(result => {
        NotificationJob.notifyCustomer(req.params.ticket_id);
        res.json({
          status: 'ok',
          message: `Assigned to ${user.username}`
        });
      });
    });
  }
}

module.exports = TicketsController;
