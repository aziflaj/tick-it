const db = require('../../lib/db');

const { arrayToObject } = require('../helpers/app_helpers');

class TicketDAO {
  getById(id) {
    return db.hgetall(`ticket:${id}`).then(ticket => {
      return db.zrange(`ticket_comments:${ticket.id}`, 0, -1).then(result => {
        const keys = result.map(item => `comment:${item}`).join(' ');
        return db.mhgetall(keys).then(result => {
          const objs = result.map(item => arrayToObject(item));
          return {
            ticket: ticket,
            comments: objs
          };
        });
      });
    });
  }

  save(ticket) {
    return db.incr('ticket_count').then(ticket_count => {
      ticket.id = ticket_count;
      ticket.created_at = Date.now();

      return db.multi()
        .hmset(`ticket:${ticket_count}`, ticket)
        .zadd('tickets', ticket.created_at, ticket.id)
        .zadd(`customer_tickets:${ticket.customer_id}`, ticket.created_at, ticket.id)
        .zadd('unassigned_tickets', ticket.created_at, ticket.id)
        .exec().then(result => ticket_count);
    });
  }

  update(id, data) {
    return db.hmset(`ticket:${id}`, data);
  }

  delete(id) {
    return db.hgetall(`ticket:${id}`).then(ticket => {
      return db.multi()
        .del(`ticket:${ticket.id}`)
        .zrem('tickets', ticket.id)
        .zrem(`customer_tickets:${ticket.customer_id}`, ticket.id)
        .exec();
    });
  }

  ticketsForCustomer(user, page = 1, perPage = 10) {
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;

    return db.zcount(`customer_tickets:${user.id}`, '-inf', '+inf').then(count => {
      return db.zrange(`customer_tickets:${user.id}`, from, to).then(result => {
        const keys = result.map((item) => `ticket:${item}`).join(' ');
        return db.mhgetall(keys).then(result => {
          return {
            tickets: result.map(item => arrayToObject(item)),
            pages: Math.ceil(count / perPage),
            currentPage: page
          };
        });
      });
    });
  }

  unassignedTickets(page = 1, perPage = 10) {
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;

    return db.zcount('unassigned_tickets', '-inf', '+inf').then(count => {
      return db.zrange('unassigned_tickets', from, to).then(result => {
        const keys = result.map(item => `ticket:${item}`).join(' ');
        return db.mhgetall(keys).then(result => {
          return db.mhgetall(keys).then(result => {
            return {
              tickets: result.map(item => arrayToObject(item)),
              pages: Math.ceil(count / perPage),
              currentPage: page
            };
          });
        });
      });
    });
  }

  ticketsForSupporter(user, page = 1, perPage = 10) {
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;
    return db.zcount(`supporter_tickets:${user.id}`, '-inf', '+inf').then(count => {
      return db.zrange(`supporter_tickets:${user.id}`, from, to).then(result => {
        const keys = result.map((item) => `ticket:${item}`).join(' ');
        return db.mhgetall(keys).then(result => {
          return {
            tickets: result.map(item => arrayToObject(item)),
            pages: Math.ceil(count / perPage),
            currentPage: page
          };
        });
      });
    });
  }

  assignToSupporter(ticketId, supporterId) {
    return db.hgetall(`ticket:${ticketId}`).then(ticket => {
      return db.multi()
        .hmset(`ticket:${ticket.id}`, { supporter_id: supporterId })
        .zadd(`supporter_tickets:${supporterId}`, ticket.created_at, ticket.id)
        .zrem('unassigned_tickets', ticket.id)
        .exec();
    });
  }

  allTickets(page = 1, perPage = 10) {
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;
    return db.zcount('tickets', '-inf', '+inf').then(count => {
      return db.zrange('tickets', from, to).then(result => {
        const keys = result.map((item) => `ticket:${item}`).join(' ');
        return db.mhgetall(keys).then(result => {
          return {
            tickets: result.map(item => arrayToObject(item)),
            pages: Math.ceil(count / perPage),
            currentPage: page
          }
        });
      });
    });
  }
}

module.exports = TicketDAO;
