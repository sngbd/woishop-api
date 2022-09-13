const cartsRouter = require('express').Router();
const response = require('../helpers/response');
// const  } = require('../utils/middleware');
const cartRepository = require('../repository/cartRepository');
const { User, Cart } = require('../models');

cartsRouter.get('/', async (_req, res) => {
  const carts = await cartRepository.findAllCarts();

  if (!carts.length) {
    return res.json(
      response(false, 'All carts not found', {}),
    );
  }

  return res.json(
    response(true, 'All carts found', carts),
  );
});

cartsRouter.get('/:user_id', async (req, res) => {
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

cartsRouter.post('/', async (req, res) => {
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

  if (!newCart) {
    return res.json(
      response(false, 'Quantity is not above 0 or a product is already added to the cart', {}),
    );
  }

  return res.json(
    response(true, `Cart with user_id '${id}' successfully created`, newCart),
  );
});

cartsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const user_id = id;
  const { product_id, quantity } = req.body;

  const cart = await cartRepository.findCartByUserId(id);
  if (!cart) {
    return res.json(
      response(false, `Cart with id '${id}' doesn't exist already`, {}),
    );
  }

  if (quantity < 1) {
    await Cart.destroy({
      where: { user_id, product_id },
    });
    return res.json(
      response(true, `Cart with id '${id}' successfully updated`, {}),
    );
  }

  await Cart.update(
    { quantity },
    { where: { user_id, product_id } },
  );
  return res.json(
    response(true, `Cart with id '${id}' successfully updated`, {
      user_id, product_id, quantity,
    }),
  );
});

cartsRouter.delete('/:id', async (req, res) => {
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
