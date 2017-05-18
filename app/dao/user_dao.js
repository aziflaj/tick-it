const bcrypt = require('bcrypt');
const db = require('../../lib/db');

const { arrayToObject } = require('../helpers/app_helpers');

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

  getSupporters(page = 1, perPage = 10) {
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;

    return db.zcount('supporter', '-inf', '+inf').then(count => {
      return db.zrange('supporter', from, to).then(result => {
        const keys = result.map((item) => `user:${item}`).join(' ');
        return db.mhgetall(keys).then(result => {
          return {
            supporters: result.map(item => arrayToObject(item)),
            pages: Math.ceil(count / perPage),
            currentPage: page
          };
        });
      });
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
          .zadd(user.role, Date.now(), user.id)
          .zadd(`${user.role}_names`, user.id, user.username)
          .exec().then(results => user_count);
      });
    });
  }

  update(username, data) {
    return this.getByUsername(username).then(user => {
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

  searchSupporter(name) {
    return db.zscan('supporter_names', 0, 'match', `${name}*`).then(result => {
      let supporters = [];
      for (let i = 0; i < result[1].length; i += 2) {
        supporters.push({
          username: result[1][i],
          id: result[1][i + 1]
        });
      }
      return supporters;
    });
  }
}

module.exports = UserDAO;
