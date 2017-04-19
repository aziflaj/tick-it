const router = require('express').Router();

const UsersController = require('../app/controllers/UsersController');
const users = new UsersController();

router.get('/:username', users.show);
router.post('/', users.create);

module.exports = router;
