class ExampleController {
  index(req, res) {
    res.json({
      status: 'ok',
      message: 'Wubba lubba dub dub'
    });
  }

  show(req, res) {
    res.json({
      status: 'ok',
      params: req.params,
      message: 'I hate to break it to you, but what people call "love" is just a chemical ' +
                'reaction that compels animals to breed.'
    });
  }

  create(req, res) {
    // Hit the database
    res.json({
      status: 'ok',
      message: 'What up my glip glops'
    });
  }

  update(req, res) {
    res.json({
      status: 'error',
      message: 'Take cover, Morty!!'
    });
  }

  delete(req, res) {
    res.json({
      status: 'error',
      message: 'Where are my testicles, Summer?'
    });
  }
}


module.exports = ExampleController;
