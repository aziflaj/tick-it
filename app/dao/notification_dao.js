const db = require('../../lib/db');

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

  getAllByUserId(id) {
    return db.zrange(`user_notifications:${id}`, 0, -1).then(result => {
      const keys = result.map(item => `notification:${item}`).join(' ');
      return db.mhgetall(keys).then(result => result.map(item => arrayToObject(item)));
    });
  }
}

module.exports = NotificationDAO;
