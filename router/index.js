const apiRouter = require('express').Router();

const pages = require('./pages');
const users = require('./users');
const auth = require('./auth');
const tickets = require('./tickets');
const supporters = require('./supporters');
const notifications = require('./notifications');

apiRouter.use('/pages', pages);
apiRouter.use('/authenticate', auth);
apiRouter.use('/users', users);
apiRouter.use('/tickets', tickets);
apiRouter.use('/supporters', supporters);
apiRouter.use('/notifications', notifications);

module.exports = apiRouter;
