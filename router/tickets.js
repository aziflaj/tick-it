const router = require('express').Router();

const TicketsController = require('../app/controllers/tickets_controller');
const tickets = new TicketsController();
const CommentsController = require('../app/controllers/comments_controller');
const comments = new CommentsController();

const TicketsPolicy = require('../app/policies/tickets_policy');
const policy = new TicketsPolicy();

const { unauthorized } = require('../lib/response');
const { isLoggedIn } = require('../app/helpers/user_helpers');

router.get('/', (req, res, next) => {
  if (isLoggedIn(req)) {
    tickets.index(req, res, next);
  } else {
    unauthorized(res);
  }
});

router.get('/:id', (req, res, next) => {
  tickets.show(req, res, next);
});

router.post('/', (req, res, next) => {
  if (policy.canCreate(req)) {
    tickets.create(req, res, next);
  } else {
    unauthorized(res);
  }
});

router.put('/:id', (req, res, next) => {
  policy.canUpdate(req).then(ok => {
    if (ok) {
      tickets.update(req, res, next);
    } else {
      unauthorized(res);
    }
  });
});

router.delete('/:id', (req, res, next) => {
  policy.canDelete(req).then(ok => {
    if (ok) {
      tickets.destroy(req, res, next);
    } else {
      unauthorized(res);
    }
  });
});

router.put('/:id/removesupport', (req, res, next) => {
  policy.canRemoveSupporter(req).then(ok => {
    if (ok) {
      tickets.update(req, res, next);
    } else {
      unauthorized(res);
    }
  });
});

router.post('/:ticket_id/comments', (req, res, next) => {
  // policy.canComment(req)
  comments.create(req, res, next);
});

router.delete('/:ticket_id/comments/:comment_id', (req, res, next) => {
  policy.canDeleteComment(req).then(ok => {
    if (ok) {
      comments.destroy(req, res, next);
    } else {
      unauthorized(res);
    }
  });
});

router.get('/:ticket_id/assign', (req, res, next) => {
  policy.canAssignSelf(req).then(ok => {
    if (ok) {
      tickets.assign(req, res, next);
    } else {
      unauthorized(res);
    }
  })
});

module.exports = router;
