const productsRouter = require('../routes/products');
const usersRouter = require('../routes/users');
const cartsRouter = require('../routes/carts');
const loginRouter = require('../routes/login');
const logoutRouter = require('../routes/logout');

const api = (app) => {
  app.use('/api/products', productsRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/carts', cartsRouter);
  app.use('/api/login', loginRouter);
  app.use('/api/logout', logoutRouter);
};

module.exports = api;
