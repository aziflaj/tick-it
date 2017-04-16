class TicketsController {
  index(req, res, next) {
    res.json({
      status: 'ok',
      message: `Tickets for user ${req.params.username}`
    });
  }
}

module.exports = TicketsController;
