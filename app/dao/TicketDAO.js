const db = require('../../lib/db');

class TicketDAO {
  getById(id) {
    return db.hgetall(`ticket:${id}`);
  }

  save(ticket) {
    return db.incr('ticket_count').then((ticket_count) => {
      console.log(`ticket_count ${ticket_count}`);
      ticket.id = ticket_count;

      return db.multi()
        .hmset(`ticket:${ticket_count}`, ticket)
        .zadd(`customer_tickets:${ticket.customer_id}`, ticket_count, Date.now())
        .exec().then((result) => ticket_count);
    });
  }

  update(id, data) {
    return db.hmset(`ticket:${id}`, data);
  }

  delete(id) {
    return getById(id).then((ticket) => {
      return db.multi()
               .del(`ticket:${ticket.id}`)
               .zrem(`customer_tickets:${ticket.customer_id}`)
               .exec();
    });
  }
}

module.exports = TicketDAO;
