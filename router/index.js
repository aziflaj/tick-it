const apiRouter = require('express').Router();

const pages = require('./pages');
const users = require('./users');
const auth = require('./auth');

apiRouter.use('/pages', pages);
apiRouter.use('/authenticate', auth);
apiRouter.use('/users', users);

module.exports = apiRouter;
