function toJson(ticket) {
  return {
    id: ticket.id,
    title: ticket.title,
    description: ticket.description,
    status: ticket.status
  };
}

module.exports.toJson = toJson;
