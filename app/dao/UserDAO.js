const bcrypt = require('bcrypt');
const db = require('../../lib/db');

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

  save(user, successHandler, errorHandler) {
    bcrypt.hash(user.password, SALT_ROUNDS).then((hash) => {
      db.incr('user_count').then((user_count) => {
        console.log(`user_count: ${user_count}`);
        user.id = user_count;
        user.password = hash;

        db.multi()
          .hmset(`user:${user_count}`, user)
          .hset('users', user.username, user_count) // username serves as index
          .hset('users', user.email, user_count)    // email serves as index
          .exec().then((results) => successHandler(results, user_count))
                 .catch((error) => errorHandler(error));
      });
    });
  }
}

module.exports = UserDAO;
