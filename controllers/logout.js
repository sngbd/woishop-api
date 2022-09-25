const { success, fail } = require('../utils/response');

const userLogout = (req, res) => {
  if (req.isAuthenticated()) {
    req.session = null;
    req.logout();
    return success(res, 'User successfully logged out', {});
  }
  return fail(res, 'User is not logged in');
};

module.exports = {
  userLogout,
};
