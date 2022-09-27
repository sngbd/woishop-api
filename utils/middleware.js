const morgan = require('morgan');
const passport = require('passport');
const cookieSession = require('cookie-session');
const cors = require('cors');
const { tokenExtractor } = require('../middlewares/middleware');

const middleware = (express, app) => {
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());

  app.use(cookieSession({
    name: 'woishop-session',
    keys: ['key1', 'key2'],
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(tokenExtractor);
};

module.exports = middleware;
