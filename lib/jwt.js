require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

class JsonWebToken {
  static sign(payload) {
    return jwt.sign(payload, SECRET_KEY);
  }

  static verify(token) {
    return jwt.verify(token, SECRET_KEY);
  }
}

module.exports = JsonWebToken;
