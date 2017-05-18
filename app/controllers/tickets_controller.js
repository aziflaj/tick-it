const TicketDAO = require('../dao/ticket_dao');
const UserDAO = require('../dao/user_dao');
const NotificationJob = require('../jobs/notification_job');
const { currentUser } = require('../helpers/user_helpers');
const { toJson } = require('../helpers/ticket_helpers');

const ticketDao = new TicketDAO();
const userDao = new UserDAO();

class TicketsController {
  index(req, res, next) {
    currentUser(req).then(user => {
      const page = req.query.page || 1;

      if (user.role === 'customer') {
        ticketDao.ticketsForCustomer(user, page).then(result => {
          res.json({
            status: 'ok',
            tickets: result.tickets,
            pages: result.pages,
            currentPage: result.currentPage
          });
        });
      } else if (user.role === 'supporter') {
        if (req.query.type === 'mine') {
          ticketDao.ticketsForSupporter(user, page).then(result => {
            res.json({
              status: 'ok',
              tickets: result.tickets,
              pages: result.pages,
              currentPage: result.currentPage
            });
          });
        } else {
          ticketDao.unassignedTickets(page).then(result => {
            res.json({
              status: 'ok',
              tickets: result.tickets,
              pages: result.pages,
              currentPage: result.currentPage
            });
          });
        }
      } else if (user.role === 'admin') {
        ticketDao.allTickets(page).then(result => {
          res.json({
            status: 'ok',
            tickets: result.tickets,
            pages: result.pages,
            currentPage: result.currentPage
          });
        });
      }
    });
  }

  show(req, res, next) {
    ticketDao.getById(req.params.id).then(ticket => {
      userDao.getById(ticket.ticket.customer_id).then(customer => {
        userDao.getById(ticket.ticket.supporter_id).then(support => {
          res.json({
            status: 'ok',
            ticket: ticket,
            customer: customer.username,
            supporter: support.username
          });
        });
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
      if(req.body.status === 'closed') {
        currentUser(req).then(user => {
          NotificationJob.notifyClosedTicket(req.params.id, user.id);
        });
      }
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

  setSupporter(req, res, next) {
    console.log(req.body);
    userDao.getByUsername(req.body.supporter).then(user => {
      ticketDao.assignToSupporter(req.params.id, user.id).then(result => {
        res.json({
          status: 'ok',
          supporter_id: user.id,
          message: `Assigned to ${user.username}`
        });
      });
    });
  }
}

module.exports = TicketsController;
