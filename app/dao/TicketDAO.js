const db = require('../../lib/db');

const { arrayToObject } = require('../helpers/TicketHelpers');

class TicketDAO {
  getById(id) {
    return db.hgetall(`ticket:${id}`);
  }

  save(ticket) {
    return db.incr('ticket_count').then((ticket_count) => {
      console.log(`ticket_count ${ticket_count}`);
      ticket.id = ticket_count;
      ticket.created_at = Date.now();

      return db.multi()
        .hmset(`ticket:${ticket_count}`, ticket)
        .zadd(`customer_tickets:${ticket.customer_id}`, ticket.created_at, ticket_count)
        .exec().then((result) => ticket_count);
    });
  }

  update(id, data) {
    return db.hmset(`ticket:${id}`, data);
  }

  delete(id) {
    return this.getById(id).then((ticket) => {
      return db.multi()
               .del(`ticket:${ticket.id}`)
               .zrem(`customer_tickets:${ticket.customer_id}`, ticket.created_at)
               .exec();
    });
  }

  ticketsForUser(user, from = 0, to = -1) {
    return db.zrange(`customer_tickets:${user.id}`, from, to).then((result) => {
      const keys = result.map((item) => `ticket:${item}`).join(' ');
      return db.mhgetall(keys).then((result) => result.map((item) => arrayToObject(item)));
    });
  }
}

module.exports = TicketDAO;
