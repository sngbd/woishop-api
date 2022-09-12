const cartsRouter = require('express').Router();
const response = require('../helpers/response');
const { userExtractor } = require('../utils/middleware');
const cartRepository = require('../repository/cartRepository');
const { User, Cart } = require('../models');

cartsRouter.get('/', userExtractor, async (_req, res) => {
  const carts = await cartRepository.findAllCarts();

  if (!carts) {
    return res.json(
      response(false, 'All carts not found', {}),
    );
  }

  return res.json(
    response(true, 'All carts found', carts),
  );
});

cartsRouter.get('/:user_id', userExtractor, async (req, res) => {
  const { user_id } = req.params;
  const cart = await cartRepository.findCartByUserId(user_id);

  if (!cart) {
    return res.json(
      response(false, `Cart with user_id '${user_id}' not found`, {}),
    );
  }

  return res.json(
    response(true, `Cart with user_id '${user_id}' found`, cart),
  );
});

cartsRouter.post('/', userExtractor, async (req, res) => {
  const { id, products } = req.body;

  const cart = await User.findOne({
    where: { id },
  });

  if (!cart) {
    return res.json(
      response(false, `User with id '${id}' doesn't exist`, {}),
    );
  }

  const newCart = await cartRepository.createCart({
    id, products,
  });

  return res.json(
    response(true, `Cart with user_id '${id}' successfully created`, newCart),
  );
});

cartsRouter.put('/:id', userExtractor, async (req, res) => {
  const { id } = req.params;
  const user_id = id;
  const { product_id, quantity } = req.body;

  const cart = await cartRepository.findCartByUserId(id);
  if (!cart) {
    return res.json(
      response(false, `Cart with id '${id}' doesn't exist already`, {}),
    );
  }

  if (!quantity) {
    await Cart.destroy({
      where: { user_id, product_id },
    });
    const newCart = Cart.findAll({
      where: { user_id, product_id },
    });
    return res.json(
      response(true, `Cart with id '${id}' successfully updated`, newCart),
    );
  }

  const newCart = await Cart.update(
    { quantity },
    { where: { user_id, product_id } },
  );
  return res.json(
    response(true, `Cart with id '${id}' successfully updated`, newCart),
  );
});

cartsRouter.delete('/:id', userExtractor, async (req, res) => {
  const { id } = req.params;

  const removed = await cartRepository.removeCartById(id);
  if (!removed) {
    return res.json(
      response(false, `Cart with user_id '${id}' is empty`, {}),
    );
  }

  return res.json(
    response(true, `Cart with id '${id}' successfully deleted`, {}),
  );
});

module.exports = cartsRouter;
