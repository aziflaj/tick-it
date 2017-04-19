const db = require('../../lib/db');

class TicketDAO {
  getById(id) {
    return db.hgetall(`ticket:${id}`);
  }

  save(ticket) {
    return db.incr('ticket_count', (ticket_count) => {
      ticket.id = ticket_count;

      return db.multi()
               .hmset(`ticket:${ticket_count}`, ticket)
               .zadd(`customer_tickets:${ticket.customer_id}`, ticket_count, Date.now())
               .exec();
    });
  }
}

module.exports = TicketDAO;
