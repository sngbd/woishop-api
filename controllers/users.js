const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const pool = require('../data/db');
const response = require('../helpers/response');

usersRouter.get('/', async (_req, res) => {
  const { rowCount, rows } = await pool.query('SELECT * FROM users');

  if (!rowCount) {
    return res.json(
      response(false, 'All users not found', {}),
    );
  }

  const props = rows.map((row) => {
    const { password_hash, ...prop } = row;
    return prop;
  });

  return res.json(
    response(true, 'All users found', props),
  );
});

usersRouter.post('/', async (req, res) => {
  const {
    username,
    name,
    phone_number,
    password,
  } = req.body;

  if (!username || !password) {
    return res.status(404).json(
      response(false, 'Username or password is missing', {}),
    );
  }

  if (password.length < 3) {
    return res.status(404).json(
      response(false, 'Password length must be at least 3 characters long', {}),
    );
  }

  if (username.length < 3) {
    return res.status(404).json(
      response(false, 'Username length must be at least 3 characters long', {}),
    );
  }

  const { rowCount } = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
  if (rowCount) {
    return res.status(404).json(
      response(false, 'Username must be unique', {}),
    );
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const { rows } = await pool.query(
    'INSERT INTO users VALUES (DEFAULT, $1, $2, $3, $4) RETURNING username, name, phone_number',
    [username, name, phone_number, passwordHash],
  );

  return res.status(201).json(
    response(true, 'User is saved', rows),
  );
});

module.exports = usersRouter;
