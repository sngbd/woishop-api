require('dotenv').config();
require('express-async-errors');
const express = require('express');

const app = express();
const cors = require('cors');

const productsRouter = require('./controllers/products');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const middleware = require('./utils/middleware');

app.use(cors());
app.use(express.json());

app.use(middleware.tokenExtractor);
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

module.exports = app;
