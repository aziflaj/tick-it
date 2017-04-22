const router = require('express').Router();

const TicketsController = require('../app/controllers/TicketsController');
const tickets = new TicketsController();
const TicketsPolicy = require('../app/policies/TicketsPolicy');

const { unauthorized } = require('../lib/response');

router.get('/', (req, res, next) => {
  const policy = new TicketsPolicy();
  if (policy.isAllowed(req)) {
    tickets.index(req, res, next);
  } else {
    unauthorized(res);
  }
});

router.get('/:id', (req, res, next) => {
  tickets.show(req, res, next);
  // const policy = new TicketsPolicy();
  // if (policy.isAllowed(req)) {
  // } else {
  //   unauthorized(res);
  // }
});

router.post('/', (req, res, next) => {
  tickets.create(req, res, next);
  // const policy = new TicketsPolicy();
  // if (policy.isAllowed(req)) {
  // } else {
  //   unauthorized(res);
  // }
});

router.put('/:ticket_id', (req, res, next) => {
  // TODO: check if authorized
  tickets.update(req, res, next);  
});

module.exports = router;
