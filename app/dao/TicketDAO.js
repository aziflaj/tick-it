const db = require('../../lib/db');

class TicketDAO {
  getById(id) {
    return db.hgetall(`ticket:${id}`);
  }

  save(ticket, successHandler, errorHandler) {
    db.incr('ticket_count').then((ticket_count) => {
      console.log(`ticket_count ${ticket_count}`);
      ticket.id = ticket_count;

      db.multi()
        .hmset(`ticket:${ticket_count}`, ticket)
        .zadd(`customer_tickets:${ticket.customer_id}`, ticket_count, Date.now())
        .exec().then((results) => successHandler(results, ticket_count))
               .catch((error) => errorHandler(error));
    });
  }
}

module.exports = TicketDAO;
