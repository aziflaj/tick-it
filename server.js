require('dotenv').config();

const apiServer = require('./api_server');
const http = require('http').Server(apiServer);
require('./websockets').prepareSocket(http);

const port = process.env.PORT || 5000;

http.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Listening on port ${port}`);
  }
});
