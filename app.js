require('dotenv').config();
require('express-async-errors');
const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const cookieSession = require('cookie-session');

const app = express();
const cors = require('cors');

const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const cartsRouter = require('./routes/carts');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');

const middleware = require('./utils/middleware');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(cookieSession({
  name: 'woishop-session',
  keys: ['key1', 'key2'],
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(middleware.tokenExtractor);
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);

module.exports = app;
