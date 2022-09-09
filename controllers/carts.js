const cartsRouter = require('express').Router();
const response = require('../helpers/response');
// const { userExtractor } = require('../utils/middleware');
const cartRepository = require('../repository/cartRepository');

cartsRouter.get('/', async (_req, res) => {
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

cartsRouter.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const carts = await cartRepository.findCartByUserId(user_id);

  if (!carts) {
    return res.json(
      response(false, `Cart with user_id '${user_id}' not found`, {}),
    );
  }

  return res.json(
    response(true, `Cart with user_id '${user_id}' found`, carts),
  );
});

cartsRouter.post('/', async (req, res) => {
  const { id, products } = req.body;

  const cart = await cartRepository.findCartByUserId(id);

  if (!cart) {
    return res.json(
      response(false, `User with id '${id}' doesn't exist`, {}),
    );
  }
  if (cart.products.length) {
    return res.json(
      response(false, `Cart with id '${id}' already exists`, {}),
    );
  }

  const newCart = await cartRepository.createCart({
    id, products,
  });
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

  const newCart = await cartRepository.updateCart(
    { where: { user_id } },
    { user_id, product_id, quantity },
  );
  return res.json(
    response(true, `Cart with id '${id}' successfully updated`, newCart),
  );
});

cartsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const cart = await cartRepository.findCartByUserId(id);
  if (!cart) {
    return res.json(
      response(false, `Cart with id '${id}' doesn't exist already`, {}),
    );
  }

  await cartRepository.removeCartById(id);
  return res.json(
    response(true, `Cart with id '${id}' successfully deleted`, {}),
  );
});

module.exports = cartsRouter;