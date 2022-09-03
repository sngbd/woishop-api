const jwt = require('jsonwebtoken');
const response = require('../helpers/response');

const tokenExtractor = (req, _res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  }
  next();
};

const userExtractor = (req, res, next) => {
  if (!req.user) {
    try {
      req.user = jwt.verify(req.token, process.env.SECRET);
    }
    catch {
      return res.status(401).json(
        response(false, 'Token invalid or missing', {}),
      );
    }
  }
  next();
};

module.exports = {
  tokenExtractor, userExtractor,
};
