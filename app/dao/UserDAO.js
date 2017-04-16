const bcrypt = require('bcrypt');
const db = require('../../lib/db.js');

const SALT_ROUNDS = 10;

class UserDAO {
  getById(id) {
    return db.hgetall(`user:${id}`);
  }

  getByUsername(username) {
    return db.hget('users', username).then((id) => {
      return this.getById(id);
    });
  }

  save(user) {
    return bcrypt.hash(user.password, SALT_ROUNDS).then((hash) => {
      db.incr('user_count').then((user_count) => {
        user.id = user_count;
        user.password = hash;
        return db.hmset(`user:${user_count}`, user).then((result) => {
          db.hset('users', user.username, user_count);
          db.hset('users', user.email, user_count);
          return user_count;
        })
      });
    });
  }
}

module.exports = UserDAO;
