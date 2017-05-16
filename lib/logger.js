const winston = require('winston');
const { AppRoot } = require('../config/app');

winston.configure({
  transports: [
    new (winston.transports.File)({ filename: `${AppRoot}/log/${process.env.NODE_ENV}.log` })
  ]
});

module.exports = winston;
