const db = require('../../lib/db');

const { arrayToObject } = require('../helpers/app_helpers');

class NotificationDAO {
  save(notification) {
    return db.incr('notification_count').then(notification_count => {
      notification.id = notification_count;
      notification.created_at = Date.now();
      notification.read = false;

      return db.multi()
        .hmset(`notification:${notification_count}`, notification)
        .zadd(`user_notifications:${notification.user_id}`, notification.created_at, notification.id)
        .zadd(`user_unread_notifications:${notification.user_id}`, notification.created_at, notification.id)
        .exec().then(result => notification_count);
    });
  }

  markAsRead(id) {
    return db.hgetall(`notification:${id}`).then(notification => {
      return db.multi()
        .hmset(`notification:${notification.id}`, { read: true })
        .zrem(`user_unread_notifications:${notification.user_id}`, notification.id)
        .exec();
    });
  }

  getAllByUserId(id, page = 1, perPage = 10) {
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;
    return db.zcount(`user_notifications:${id}`, '-inf', '+inf').then(count => {
      return db.zrange(`user_notifications:${id}`, from, to).then(result => {
        const keys = result.map(item => `notification:${item}`).join(' ');
        return db.mhgetall(keys).then(result => {
          return {
            notifications: result.map(item => arrayToObject(item)),
            pages: Math.ceil(count / perPage),
            currentPage: page
          };
        });
      });
    });
  }

  getUnreadByUserId(id, page = 1, perPage = 10) {
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;
    return db.zcount(`user_unread_notifications:${id}`, '-inf', '+inf').then(count => {
      return db.zrange(`user_unread_notifications:${id}`, from, to).then(result => {
        const keys = result.map(item => `notification:${item}`).join(' ');
        return db.mhgetall(keys).then(result => {
          return {
            notifications: result.map(item => arrayToObject(item)),
            pages: Math.ceil(count / perPage),
            currentPage: page
          };
        });
      });
    });
  }
}

module.exports = NotificationDAO;
