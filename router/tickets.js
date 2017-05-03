const router = require('express').Router();

const TicketsController = require('../app/controllers/TicketsController');
const tickets = new TicketsController();
const TicketsPolicy = require('../app/policies/TicketsPolicy');
const policy = new TicketsPolicy();

const { unauthorized } = require('../lib/response');
const { isLoggedIn } = require('../app/helpers/UserHelpers');

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

router.delete('/:id', (req, res, next) => {
  policy.canDelete(req).then((ok) => {
    if (ok) {
      tickets.destroy(req, res, next);
    } else {
      unauthorized(res);
    }
  });
});

module.exports = router;
