require('dotenv').config();
require('express-async-errors');
const express = require('express');

const app = express();

const api = require('./utils/api');
const middleware = require('./utils/middleware');

middleware(express, app);
api(app);

module.exports = app;
