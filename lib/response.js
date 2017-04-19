function unauthorized(res, message) {
  const defaultMessage = 'You can\'t access this route';
  message = (typeof message !== 'undefined') ? message : defaultMessage;
  res.status(401).json({
    status: 'unauthorized',
    message: message
  });
}

module.exports.unauthorized = unauthorized;
