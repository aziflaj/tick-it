const CommentDAO = require('../dao/comment_dao');
const NotificationJob = require('../jobs/notification_job');
const { currentUser } = require('../helpers/user_helpers');

const commentDao = new CommentDAO();

class CommentsController {
  create(req, res, next) {
    currentUser(req).then(user => {
      const comment = {
        content: req.body.content,
        ticket_id: req.params.ticket_id,
        author_id: user.id
      };

      commentDao.save(comment).then(id => {
        NotificationJob.perform('comment', {comment_id: id});
        // NotificationJob.notifyNewComment(comment_id);
        res.json({
          status: 'ok',
          id: id
        });
      }).catch(error => {
        console.log(error);
        res.json({
          status: 'error',
          message: 'Some issue occurred'
        });
      });
    });
  }

  destroy(req, res, next) {
    const ticketId = req.params.ticket_id;
    const commentId = req.params.comment_id;

    commentDao.delete(commentId).then(result => {
      res.json({
        status: 'ok',
        message: `Comment ${commentId} deleted`
      })
    });
  }
}

module.exports = CommentsController;
