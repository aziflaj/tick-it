const db = require('../../lib/db');

class CommentDAO {
  save(comment) {
    return db.incr('comment_count').then(comment_count => {
      comment.id = comment_count;
      comment.created_at = Date.now();

      return db.multi()
        .hmset(`comment:${comment_count}`, comment)
        .zadd(`ticket_comments:${comment.ticket_id}`, comment.created_at, comment.id)
        .exec().then(result => comment_count);
    });
  }

  delete(id) {
    return db.hgetall(`comment:${id}`).then(comment => {
      return db.multi()
        .del(`comment:${comment.id}`)
        .zrem(`ticket_comments:${comment.ticket_id}`, comment.id)
        .exec();
    });
  }
}

module.exports = CommentDAO;
