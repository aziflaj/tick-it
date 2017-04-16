const router = require('express').Router();

const UsersController = require('../app/controllers/UsersController.js');
const users = new UsersController();

router.get('/:id', users.show);
router.post('/', users.create);

module.exports = router;
