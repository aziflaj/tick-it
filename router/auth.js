const router = require('express').Router();

const AuthenticationController = require('../app/controllers/authentication_controller');
const auth = new AuthenticationController();

router.post('/', auth.authenticate);

module.exports = router;
