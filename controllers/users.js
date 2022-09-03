const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const nodemailer = require('nodemailer');
const joi = require('joi');
const { Op } = require('sequelize');
const response = require('../helpers/response');
const { User, OTP } = require('../models');

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

  await OTP.create({
    user_id: id,
    expires_at: Date.now() + 3600000,
    otp: hashedOTP,
  });

  await transporter.sendMail(mailOptions);

  return res.json(
    response(true, 'OTP for verification has been sent to email', {
      status: 'Pending',
      user_id: id,
      email,
    }),
  );
};

usersRouter.get('/', async (_req, res) => {
  const users = await User.findAll();

  if (!users) {
    return res.json(
      response(false, 'All users not found', {}),
    );
  }

  return res.json(
    response(true, 'All users found', users),
  );
});

usersRouter.post('/', async (req, res) => {
  const {
    username,
    name,
    email,
    password,
  } = req.body;

  const schema = joi.object({
    username: joi.string()
      .alphanum()
      .min(3)
      .required(),
    name: joi.string(),
    email: joi.string()
      .required(),
    password: joi.string()
      .pattern(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
  });

  try {
    await schema.validateAsync({
      username, name, email, password,
    });
  }
  catch (err) {
    return res.json(
      response(false, err.details.map((e) => e.message), {}),
    );
  }

  const user = await User.findOne({
    where: {
      [Op.or]: [
        { username },
        { email },
      ],
    },
  });

  if (user) {
    return res.json(
      response(false, 'Username or email has been registered', {}),
    );
  }

  const saltRounds = 10;
  const password_hash = await bcrypt.hash(password, saltRounds);

  const { id } = await User.create({
    username, name, email, password_hash,
  });

  return sendOTP({ id, email }, res);
});

usersRouter.post('/verify', async (req, res) => {
  const { user_id, otp } = req.body;

  const schema = joi.object({
    user_id: joi.number()
      .integer()
      .required(),
    otp: joi.string()
      .required(),
  });

  try {
    await schema.validateAsync({ user_id, otp });
  }
  catch (err) {
    return res.json(
      response(false, err.details.map((e) => e.message), {}),
    );
  }

  const foundOTP = await OTP.findOne({
    where: { user_id },
  });

  if (!foundOTP) {
    return res.status(404).json(
      response(
        false,
        'Account doesn\'t exist or has been verified already. Please register or login.',
        {},
      ),
    );
  }

  const { expires_at, otp: hashedOTP } = foundOTP;

  const expiredOTP = await OTP.findOne({
    where: { user_id },
  });

  if (expires_at < Date.now()) {
    await expiredOTP.destroy();
    return res.json(
      response(false, 'Code has expired. Please request again.', {}),
    );
  }

  const validOTP = await bcrypt.compare(otp, hashedOTP);

  if (!validOTP) {
    return res.status(404).json(
      response(false, 'Invalid code passed. Please check your inbox.', {}),
    );
  }

  const user = await User.findOne({
    where: { id: user_id },
  });

  user.verified = true;
  await user.save();
  await expiredOTP.destroy();

  return res.json(
    response(true, 'User\'s email verified successfully.', {
      status: 'Verified',
      user_id,
    }),
  );
});

usersRouter.post('/resendOTP', async (req, res) => {
  const { user_id, email } = req.body;

  if (!user_id || !email) {
    return res.json(
      response(false, 'Empty user detail are not allowed', {}),
    );
  }

  const expiredOTP = await OTP.findOne({
    where: { user_id },
  });

  const user = await User.findOne({
    where: { id: user_id },
  });

  const registered = await User.findOne({
    where: { email },
  });

  if (!user) {
    return res.json(
      response(false, 'Account does not exist', {}),
    );
  }

  if (registered) {
    return res.json(
      response(false, 'Email has been registered', {}),
    );
  }

  user.email = email;
  await user.save();

  if (user.verified) {
    return res.json(
      response(false, 'Account has been verified', {}),
    );
  }

  await expiredOTP.destroy();
  return sendOTP({ id: user_id, email }, res);
});

module.exports = usersRouter;
