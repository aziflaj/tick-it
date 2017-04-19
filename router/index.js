const apiRouter = require('express').Router();

const pages = require('./pages.js');
const users = require('./users.js');
const auth = require('./auth.js');

apiRouter.use('/pages', pages);
apiRouter.use('/authenticate', auth);
apiRouter.use('/users', users);

module.exports = apiRouter;
