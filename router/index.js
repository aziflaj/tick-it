const apiRouter = require('express').Router();

const pages = require('./pages');
const users = require('./users');
const auth = require('./auth');
const tickets = require('./tickets');

apiRouter.use('/pages', pages);
apiRouter.use('/authenticate', auth);
apiRouter.use('/users', users);
apiRouter.use('/tickets', tickets);

module.exports = apiRouter;
