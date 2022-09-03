const logoutRouter = require('express').Router();

logoutRouter.get('/', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/api/products');
});

module.exports = logoutRouter;
