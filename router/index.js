const apiRouter = require('express').Router();

const example = require('./example.js');
const users = require('./users.js');
const auth = require('./auth.js');

apiRouter.use('/example', example);
apiRouter.use('/authenticate', auth);
apiRouter.use('/users', users);

module.exports = apiRouter;
