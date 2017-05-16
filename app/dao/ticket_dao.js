const db = require('../../lib/db');

const { arrayToObject } = require('../helpers/app_helpers');

class TicketDAO {
  unassignedTickets() {
    return db.zrange('unassigned_tickets', 0, -1).then(result => {
      const keys = result.map(item => `ticket:${item}`).join(' ');
      return db.mhgetall(keys).then(result => {
        return db.mhgetall(keys).then(result => result.map(item => arrayToObject(item)));
      });
    });
  }

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
        .zadd(`tickets`, ticket.created_at, ticket.id)
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
        .hdel('tickets', ticket.id)
        .zrem(`customer_tickets:${ticket.customer_id}`, ticket.id)
        .exec();
    });
  }

  ticketsForCustomer(user, from = 0, to = -1) {
    return db.zrange(`customer_tickets:${user.id}`, from, to).then(result => {
      const keys = result.map((item) => `ticket:${item}`).join(' ');
      return db.mhgetall(keys).then(result => result.map(item => arrayToObject(item)));
    });
  }

  ticketsForSupporter(user, from = 0, to = -1) {
    return db.zrange(`supporter_tickets:${user.id}`, from, to).then(result => {
      const keys = result.map((item) => `ticket:${item}`).join(' ');
      return db.mhgetall(keys).then(result => result.map(item => arrayToObject(item)));
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

  allTickets(from = 0, to = -1) {
    return db.zrange(`tickets`, from, to).then(result => {
      const keys = result.map((item) => `ticket:${item}`).join(' ');
      return db.mhgetall(keys).then(result => result.map(item => arrayToObject(item)));
    })
  }
}

module.exports = TicketDAO;
