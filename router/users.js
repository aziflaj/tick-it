const router = require('express').Router();

const UsersController = require('../app/controllers/UsersController.js');
const users = new UsersController();

const TicketsController = require('../app/controllers/TicketsController.js');
const tickets = new TicketsController();
const TicketsPolicy = require('../app/policies/TicketsPolicy.js');

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

module.exports = router;
