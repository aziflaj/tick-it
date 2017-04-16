const router = require('express').Router();

const AuthenticationController = require('../app/controllers/AuthenticationController.js');
const auth = new AuthenticationController();

router.post('/', auth.authenticate);

module.exports = router;
