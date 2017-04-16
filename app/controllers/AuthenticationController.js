class AuthenticationController {
  authenticate(req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
  }
}

module.exports = AuthenticationController;
