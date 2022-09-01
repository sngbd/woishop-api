const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const pool = require('../data/db');
const response = require('../helpers/response');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const { rowCount, rows } = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
  const user = rows[0];

  const passwordCorrect = !rowCount
    ? false
    : await bcrypt.compare(password, user.password_hash);

  if (!(user && passwordCorrect)) {
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
