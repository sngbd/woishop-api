const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { success, fail } = require('../utils/response');
const otpRepository = require('../repository/otpRepository');
const userRepository = require('../repository/userRepository');
const { sendOTP } = require('../services/nodemailer');

const registerUser = async (req, res) => {
  const {
    username,
    name,
    email,
    password,
  } = req.body;

  const user = await userRepository.findOne({
    where: {
      [Op.or]: [
        { username },
        { email },
      ],
    },
  });

  if (user) {
    return fail(res, 'Username or email has been registered');
  }

  const saltRounds = 10;
  const password_hash = await bcrypt.hash(password, saltRounds);

  const { id } = await userRepository.createUser({
    username, name, email, password_hash,
  });

  return sendOTP({ id, email }, res);
};

const verifyUser = async (req, res) => {
  const { user_id, otp } = req.body;

  const foundOTP = await otpRepository.findOne({
    where: { user_id },
  });

  if (!foundOTP) {
    return fail(
      res.status(404),
      'Account doesn\'t exist or has been verified already. Please register or login.',
    );
  }

  const { expires_at, otp: hashedOTP } = foundOTP;

  const validOTP = await bcrypt.compare(otp, hashedOTP);

  if (!validOTP) {
    return fail(res, 'Invalid code passed. Please check your inbox.');
  }

  await otpRepository.removeOTP({
    where: { user_id },
  });

  if (expires_at < Date.now()) {
    return fail(res, 'Code has expired. Please request again.');
  }

  await userRepository.updateUser(
    { verified: true },
    { where: { id: user_id } },
  );

  return success(
    res,
    'User\'s email verified successfully.',
    { status: 'Verified', user_id },
  );
};

const resendOTP = async (req, res) => {
  const { user_id, email } = req.body;

  const user = await userRepository.findOne({
    where: { id: user_id },
  });

  if (!user) {
    return fail(res, 'Account does not exist');
  }

  const registered = await userRepository.findOne({
    where: { email },
  });

  if (registered && registered.email !== user.email) {
    return fail(res, 'Email has been registered');
  }

  if (user.verified) {
    return fail(res, 'Account has been verified');
  }

  user.email = email;
  user.save();

  await otpRepository.removeOTP({
    where: { user_id },
  });

  return sendOTP({ id: user_id, email }, res);
};

module.exports = {
  registerUser,
  verifyUser,
  resendOTP,
};
