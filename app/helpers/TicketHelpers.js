function toJson(ticket) {
  return {
    id: ticket.id,
    title: ticket.title,
    description: ticket.description,
    status: ticket.status
  };
}

function arrayToObject(array) {
  let obj = {};
  let i = 0
  while (i < array.length) {
    obj[array[i]] = array[i+1];
    i += 2;
  }
  return obj;
}

module.exports.toJson = toJson;
module.exports.arrayToObject = arrayToObject;
