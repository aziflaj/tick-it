const Socket = require('socket.io');

class WebSockets {
  static prepareSocket(httpServer) {
    const io = Socket(httpServer);

    return io.on('connection', (socket) => {
      console.log('connected');

      socket.on('disconnect', () => {
        console.log('disconnected');
      });
    });
  }
}

module.exports = WebSockets;
