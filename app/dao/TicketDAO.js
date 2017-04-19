const db = require('../../lib/db');

class TicketDAO {
  getById(id) {
    return db.hgetall(`ticket:${id}`);
  }

  save(ticket) {
    db.incr('ticket_count').then((ticket_count) => {
      ticket.id = ticket_count;
      return db.hmset(`ticket:${ticket_count}`, ticket).then((result) => {
        db.zadd(`customer_tickets:${ticket.customer_id}`, ticket_count, Date.now());
      });
    });
  }
}

module.exports = TicketDAO;
