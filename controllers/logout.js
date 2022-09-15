const logoutRouter = require('express').Router();
const { success, fail } = require('../utils/response');

logoutRouter.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    req.session = null;
    req.logout();
    return success(res, 'User successfully logged out', {});
  }
  return fail(res, 'User is not logged in');
});

module.exports = logoutRouter;
