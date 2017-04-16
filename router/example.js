const router = require('express').Router();

const ExampleController = require('../app/controllers/ExampleController.js');
const example = new ExampleController();

router.get('/', example.index);

module.exports = router;
