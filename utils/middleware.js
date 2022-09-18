const jwt = require('jsonwebtoken');
const axios = require('axios');
const { fail } = require('./response');
const { User } = require('../models');

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
      const { id } = await User.findOne({
        where: { sub },
      });
      req.user = { id };
    } catch {
      try {
        req.user = jwt.verify(req.token, process.env.SECRET);
      } catch {
        fail(res.status(401), 'Token invalid or missing');
      }
    }
  }

  const { verified } = await User.findOne({
    where: { id: req.user.id },
  });

  if (!verified) {
    fail(res.status(401), 'Account not verified');
  }

  next();
};

module.exports = {
  tokenExtractor, userExtractor,
};
