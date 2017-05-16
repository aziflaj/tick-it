const Socket = require('socket.io');
const Redis = require('ioredis');

const db = require('./lib/db');

class WebSockets {
  static prepareSocket(httpServer) {
    const io = Socket(httpServer);
    const subscriber = new Redis(`${process.env.SUB_URL}`);

    return io.on('connection', (socket) => {
      console.log('connected');

      subscriber.subscribe('notifications', (e, c) => {
        subscriber.on('message', (channel, msg) => {
          if (channel === 'notifications') {
            console.log(`Get notification #${msg} on websockets`);

            db.hgetall(`notification:${msg}`).then(notification => {
              console.log(notification);
              socket.emit(`user:${notification.user_id}`, notification);
            });
          } else {
            console.log(`${channel}:${msg}`);
          }
        });
      });

      socket.on('disconnect', () => {
        console.log('disconnected');
      });
    });
  }
}

module.exports = WebSockets;
