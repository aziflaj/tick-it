const router = require('express').Router();

const UsersController = require('../app/controllers/UsersController');
const users = new UsersController();

const TicketsController = require('../app/controllers/TicketsController');
const tickets = new TicketsController();
const TicketsPolicy = require('../app/policies/TicketsPolicy');

router.get('/:username', users.show);
router.post('/', users.create);

router.get('/:username/tickets', (req, res, next) => {
  const policy = new TicketsPolicy();
  if (policy.isAllowed(req)) {
    tickets.index(req, res, next);
  } else {
    res.status(401).json({
      status: 'unauthorized',
      message: 'You can\'t access this route'
    });
  }
});

router.post('/:username/tickets', (req, res, next) => {
  const policy = new TicketsPolicy();
  if (policy.isAllowed(req)) {
    tickets.create(req, res, next);
  } else {
    res.status(401).json({
      status: 'unauthorized',
      message: 'You can\'t access this route'
    });
  }
});

module.exports = router;
