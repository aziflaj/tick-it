const bcrypt = require('bcrypt');
const db = require('../../lib/db');

const SALT_ROUNDS = 10;

class UserDAO {
  getById(id) {
    return db.hgetall(`user:${id}`);
  }

  getByUsername(username) {
    return db.hget('users', username).then(id => {
      return this.getById(id);
    });
  }

  save(user) {
    return bcrypt.hash(user.password, SALT_ROUNDS).then(hash => {
      return db.incr('user_count').then(user_count => {
        user.id = user_count;
        user.password = hash;

        return db.multi()
          .hmset(`user:${user_count}`, user)
          .hset('users', user.username, user_count) // username serves as index
          .hset('users', user.email, user_count)    // email serves as index
          .exec().then(results => user_count);
      });
    });
  }

  update(username, data) {
    return getByUsername(username).then(user => {
      return db.hmset(`user:${user.id}`, data);
    });
  }

  delete(username) {
    return this.getByUsername(username).then((user) => {
      // TODO: delete tickets
      return db.multi()
               .hdel('users', user.username)
               .hdel('users', user.email)
               .del(`user:${user.id}`)
               .exec();
    });
  }
}

module.exports = UserDAO;
