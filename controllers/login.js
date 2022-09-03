const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const response = require('../helpers/response');
const { User } = require('../models');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
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

module.exports = loginRouter;
