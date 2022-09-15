const jwt = require('jsonwebtoken');
const axios = require('axios');
const { fail } = require('./response');

const tokenExtractor = (req, _res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  }
  next();
};

const userExtractor = async (req, res, next) => {
  if (!req.user) {
    try {
      const { data: { sub } } = await axios(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${req.token}`,
      );
      req.user = { id: sub };
    } catch {
      try {
        req.user = jwt.verify(req.token, process.env.SECRET);
      } catch {
        fail(res.status(401), 'Token invalid or missing');
      }
    }
  }
  next();
};

module.exports = {
  tokenExtractor, userExtractor,
};
