const router = require('express').Router();

const PagesController = require('../app/controllers/PagesController.js');
const pages = new PagesController();

router.get('/', pages.index);

module.exports = router;
