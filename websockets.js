const Socket = require('socket.io');
const db = require('./lib/db');

class WebSockets {
  static prepareSocket(httpServer) {
    const io = Socket(httpServer);

    return io.on('connection', (socket) => {
      console.log('connected');

      db.on('notifications', (channel, message) => {
        console.log(`Received message ${message} from channel ${channel}`);
      });

      socket.on('disconnect', () => {
        console.log('disconnected');
      });
    });
  }
}

module.exports = WebSockets;
