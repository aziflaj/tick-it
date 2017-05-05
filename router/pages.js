const router = require('express').Router();

const PagesController = require('../app/controllers/pages_controller');
const pages = new PagesController();

router.get('/', pages.index);

module.exports = router;
