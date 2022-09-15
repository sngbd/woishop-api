const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const passport = require('passport');
const { success, fail } = require('../utils/response');
const userRepository = require('../repository/userRepository');
require('../config/passport');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await userRepository.findOne({
    where: { username },
  });

  const passwordCorrect = !user
    ? false
    : await bcrypt.compare(password, user.password_hash);

  if (!passwordCorrect) {
    return fail(res.status(401), 'Invalid username or password');
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: '3h' },
  );

  return success(
    res,
    'User successfully logged in',
    { token, username: user.username, name: user.name },
  );
});

loginRouter.get('/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] },
));

loginRouter.get('/google/callback', passport.authenticate(
  'google',
  {
    successRedirect: '/api/login/success',
    failureRedirect: '/api/login/fail',
  },
));

loginRouter.get('/success', (req, res) => {
  if (req.isAuthenticated()) {
    return success(res, 'User successfully logged in', {
      sub: req.user.id,
      accessToken: req.user.accessToken,
    });
  }
  return res.redirect('/api/login/fail');
});

loginRouter.get('/fail', (req, res) => {
  if (req.isUnauthenticated()) {
    return fail(res, 'User failed to log in');
  }
  return res.redirect('/api/login/success');
});

module.exports = loginRouter;
