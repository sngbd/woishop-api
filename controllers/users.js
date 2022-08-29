const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const nodemailer = require('nodemailer');
const pool = require('../data/db');
const response = require('../helpers/response');

const { AUTH_EMAIL, AUTH_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASS,
  },
});

const sendOTP = async ({ id, email }, res) => {
  const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

  const mailOptions = {
    from: AUTH_EMAIL,
    to: email,
    subject: 'Verify your email',
    html: `<p>Enter <b>${otp}</b> in the app 
    to verify your email address and complete the registration.</p>
    <p>This code expires in 1 hour.</p>`,
  };

  const saltRounds = 10;
  const hashedOTP = await bcrypt.hash(otp, saltRounds);

  await pool.query(
    'INSERT INTO otp VALUES (DEFAULT, $1, $2, $3, $4)',
    [id, Date.now(), Date.now() + 3600000, hashedOTP],
  );

  await transporter.sendMail(mailOptions);

  return res.json(
    response(true, 'Verification OTP email sent', {
      status: 'Pending',
      user_id: id,
      email,
    }),
  );
};

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
    email,
    phone_number,
    password,
  } = req.body;

  if (!username || !password || !email || !phone_number || !name) {
    return res.status(404).json(
      response(false, 'Empty users details are not allowed', {}),
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
    'INSERT INTO users VALUES (DEFAULT, $1, $2, $3, $4, $5, false) RETURNING id, email',
    [username, name, email, phone_number, passwordHash],
  );

  return sendOTP(rows[0], res);
});

usersRouter.post('/verify', async (req, res) => {
  const { user_id, otp } = req.body;
  if (!user_id || !otp) {
    return res.status(404).json(
      response(false, 'Empty OTP details are not allowed', {}),
    );
  }

  const { rowCount, rows } = await pool.query('SELECT * FROM otp WHERE user_id=$1', [user_id]);

  if (!rowCount) {
    return res.status(404).json(
      response(
        false,
        'Account doesn\'t exist or has been verified already. Please register or login.',
        {},
      ),
    );
  }

  const { expires_at } = rows[0];
  const hashedOTP = rows[0].otp;

  if (expires_at < Date.now()) {
    await pool.query('DELETE FROM otp WHERE user_id=$1', [user_id]);
    return res.status(404).json(
      response(false, 'Code has expired. Please request again.', {}),
    );
  }

  const validOTP = await bcrypt.compare(otp, hashedOTP);

  if (!validOTP) {
    return res.status(404).json(
      response(false, 'Invalid code passed. Please check your inbox.', {}),
    );
  }

  await pool.query('UPDATE users SET verified=true WHERE id=$1', [user_id]);
  await pool.query('DELETE FROM otp WHERE user_id=$1', [user_id]);

  return res.json(
    response(true, 'users email verified successfully.', {
      status: 'Verified',
      user_id,
    }),
  );
});

usersRouter.post('/resendOTP', async (req, res) => {
  const { user_id, email } = req.body;

  if (!user_id || !email) {
    return res.status(404).json(
      response(false, 'Empty users details are not allowed', {}),
    );
  }
  await pool.query('DELETE FROM otp WHERE user_id=$1', [user_id]);
  return sendOTP({ id: user_id, email }, res);
});

module.exports = usersRouter;
