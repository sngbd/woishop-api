const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const joi = require('joi');
const { Op } = require('sequelize');
const response = require('../helpers/response');
const otpRepository = require('../repository/otpRepository');
const userRepository = require('../repository/userRepository');
const { sendOTP } = require('../config/nodemailer');

usersRouter.get('/', async (_req, res) => {
  const users = await userRepository.findAll();

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

  const user = await userRepository.findOne({
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

  const { id } = await userRepository.createUser({
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

  const foundOTP = await otpRepository.findOne({
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

  const validOTP = await bcrypt.compare(otp, hashedOTP);

  if (!validOTP) {
    return res.status(404).json(
      response(false, 'Invalid code passed. Please check your inbox.', {}),
    );
  }

  await otpRepository.removeOTP({
    where: { user_id },
  });

  if (expires_at < Date.now()) {
    return res.json(
      response(false, 'Code has expired. Please request again.', {}),
    );
  }

  await userRepository.updateUser(
    { where: { id: user_id } },
    'verified',
    true,
  );

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

  const user = await userRepository.findOne({
    where: { id: user_id },
  });

  if (!user) {
    return res.json(
      response(false, 'Account does not exist', {}),
    );
  }

  const registered = await userRepository.findOne({
    where: { email },
  });

  if (registered && registered.email !== user.email) {
    return res.json(
      response(false, 'Email has been registered', {}),
    );
  }

  if (user.verified) {
    return res.json(
      response(false, 'Account has been verified', {}),
    );
  }

  user.email = email;
  user.save();

  await otpRepository.removeOTP({
    where: { user_id },
  });

  return sendOTP({ id: user_id, email }, res);
});

module.exports = usersRouter;
