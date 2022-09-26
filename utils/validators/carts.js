const joi = require('joi');
const { fail } = require('../response');

const product = joi.object({
  product_id: joi.number()
    .required(),
  quantity: joi.number()
    .required(),
});

const addCart = async (req, res, next) => {
  const schema = joi.object({
    products: joi.array().items(product)
      .min(1)
      .required(),
  });

  try {
    await schema.validateAsync(req.body);
  } catch (err) {
    fail(res, err.details.map((e) => e.message));
  }
  next();
};

const updateCart = async (req, res, next) => {
  try {
    await product.validateAsync(req.body);
  } catch (err) {
    fail(res, err.details.map((e) => e.message));
  }
  next();
};

module.exports = {
  addCart,
  updateCart,
};
