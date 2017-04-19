const UserDAO = require('../dao/UserDAO');
const { toJson } = require('../helpers/UserHelpers');

class UsersController {
  show(req, res, next) {
    const dao = new UserDAO();
    dao.getByUsername(req.params.username).then((user) => {
      res.json({
        status: 'ok',
        user: toJson(user)
      });
    });
  }

  create(req, res, next) {
    const user = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      full_name: req.body.full_name
    };

    const dao = new UserDAO();

    dao.save(user,
      (results, user_id) => {
        res.json({
          status: 'ok',
          message: `User saved with id ${user_id}`
        });
      },
      (error) => {
        console.log(error);
        res.json({
          status: 'error',
          message: 'Some issue occurred'
        });
      }
    );
  }
}

module.exports = UsersController;
