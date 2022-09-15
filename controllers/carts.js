const cartsRouter = require('express').Router();
const { success, fail } = require('../utils/response');
const { userExtractor } = require('../utils/middleware');
const cartRepository = require('../repository/cartRepository');
const { User, Cart } = require('../models');

cartsRouter.get('/', userExtractor, async (req, res) => {
  const { user_id } = req.query;
  if (!user_id) {
    const carts = await cartRepository.findAllCarts();

    if (!carts.length) {
      return fail(res, 'All carts not found');
    }

    return success(res, 'All carts found', carts);
  }

  const cart = await cartRepository.findCartByUserId(user_id);

  if (!cart) {
    return fail(res, `Cart with user_id '${user_id}' not found`);
  }

  return success(res, `Cart with user_id '${user_id}' found`, cart);
});

cartsRouter.post('/', userExtractor, async (req, res) => {
  let { id } = req.user;
  const { products } = req.body;

  if (typeof id === 'string') {
    ({ id } = await User.findOne({
      where: { sub: id },
    }));
  }

  const cart = await User.findOne({
    where: { id },
  });

  if (!cart) {
    return fail(res, `User with id '${id}' doesn't exist`);
  }

  const newCart = await cartRepository.createCart({
    id, products,
  });

  if (!newCart) {
    return fail(res, 'Quantity is not above 0 or a product is already added to the cart');
  }

  return success(res, `Cart with user_id '${id}' successfully created`, newCart);
});

cartsRouter.put('/:id', userExtractor, async (req, res) => {
  const { id } = req.params;
  const user_id = id;
  const { product_id, quantity } = req.body;

  const cart = await cartRepository.findCartByUserId(id);
  if (!cart) {
    return fail(res, `Cart with id '${id}' doesn't exist already`);
  }

  if (quantity < 1) {
    await Cart.destroy({
      where: { user_id, product_id },
    });
    return success(res, `Cart with id '${id}' successfully updated`, {});
  }

  await Cart.update(
    { quantity },
    { where: { user_id, product_id } },
  );
  return success(res, `Cart with id '${id}' successfully updated`, {
    user_id, product_id, quantity,
  });
});

cartsRouter.delete('/:id', userExtractor, async (req, res) => {
  const { id } = req.params;

  const removed = await cartRepository.removeCartById(id);
  if (!removed) {
    return fail(res, `Cart with user_id '${id}' is empty`);
  }

  return success(res, `Cart with id '${id}' successfully deleted`, {});
});

module.exports = cartsRouter;
