const joi = require('joi');
const { fail } = require('../response');

const registerUser = async (req, res, next) => {
  const schema = joi.object({
    username: joi.string()
      .alphanum()
      .min(3)
      .required(),
    name: joi.string(),
    email: joi.string()
      .required(),
    password: joi.string()
      .min(3)
      .required(),
  });

  try {
    await schema.validateAsync(req.body);
  } catch (err) {
    fail(res, err.details.map((e) => e.message));
  }
  next();
};

const verifyUser = async (req, res, next) => {
  const schema = joi.object({
    user_id: joi.number()
      .integer()
      .required(),
    otp: joi.string()
      .required(),
  });

  try {
    await schema.validateAsync(req.body);
  } catch (err) {
    fail(res, err.details.map((e) => e.message));
  }
  next();
};

const resendOTP = async (req, res, next) => {
  const schema = joi.object({
    user_id: joi.number()
      .integer()
      .required(),
    email: joi.string()
      .required(),
  });

  try {
    await schema.validateAsync(req.body);
  } catch (err) {
    fail(res, err.details.map((e) => e.message));
  }
  next();
};

module.exports = {
  registerUser,
  verifyUser,
  resendOTP,
};
