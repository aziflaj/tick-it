const Socket = require('socket.io');
const Redis = require('ioredis');

const db = require('./lib/db');
const logger = require('./lib/logger');

class WebSockets {
  static prepareSocket(httpServer) {
    const io = Socket(httpServer);
    const subscriber = new Redis(`${process.env.SUB_URL}`);

    return io.on('connection', (socket) => {
      console.log('connected');

      subscriber.subscribe('notifications', (error, count) => {
        if (error) {
          logger.error(error);
        }

        subscriber.on('message', (channel, msg) => {
          if (channel === 'notifications') {
            db.hgetall(`notification:${msg}`).then(notification => {
              logger.info('Notifying for %s', JSON.stringify(notification));
              socket.emit(`user:${notification.user_id}`, notification);
            });
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
