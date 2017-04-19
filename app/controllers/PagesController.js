class PagesController {
  index(req, res, next) {
    res.json({
      status: 'ok',
      message: 'Wubba lubba dub dub'
    });
  }
}

module.exports = PagesController;
