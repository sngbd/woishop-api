require('dotenv').config();
require('express-async-errors');
const express = require('express');

const app = express();
const cors = require('cors');
const productsRouter = require('./controllers/products');
const usersRouter = require('./controllers/products');

app.use(cors());

app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);

module.exports = app;
