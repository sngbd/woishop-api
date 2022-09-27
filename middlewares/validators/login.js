const joi = require('joi');
const { fail } = require('../../utils/response');

const userLogin = async (req, res, next) => {
  const schema = joi.object({
    username: joi.string()
      .alphanum()
      .required(),
    password: joi.string()
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
  userLogin,
};
