const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const passport = require('passport');
const response = require('../helpers/response');
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
    return res.status(401).json(
      response(false, 'Invalid username or password', {}),
    );
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

  return res.status(401).json(
    response(
      true,
      'User successfully logged in',
      { token, username: user.username, name: user.name },
    ),
  );
});

loginRouter.get('/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] },
));

loginRouter.get('/google/callback', passport.authenticate(
  'google',
  {
    successRedirect: '/api/products',
    failureRedirect: '/api/login/google',
  },
));

module.exports = loginRouter;
