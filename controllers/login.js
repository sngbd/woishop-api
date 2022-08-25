const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const pool = require('../data/db');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const { rowCount, rows } = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
  const user = rows[0];

  const passwordCorrect = !rowCount
    ? false
    : await bcrypt.compare(password, user.password_hash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password',
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  return res.send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
