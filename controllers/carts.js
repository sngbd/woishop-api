const { success, fail } = require('../utils/response');
const cartRepository = require('../repository/cartRepository');
const userRepository = require('../repository/userRepository');

const getAllCart = async (req, res) => {
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
};

const addCart = async (req, res) => {
  const { products } = req.body;
  const { id } = req.user;

  const cart = await userRepository.findOne({
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
};

const updateCart = async (req, res) => {
  const { id } = req.user;
  const user_id = id;
  const { product_id, quantity } = req.body;

  const cart = await cartRepository.findCartByUserId(id);
  if (!cart) {
    return fail(res, `Cart with id '${id}' doesn't exist already`);
  }

  const updated = await cartRepository.updateOrder(
    { quantity },
    { user_id, product_id },
  );

  if (!updated) {
    return fail(res, `Order with product_id ${product_id} doesn't exist`);
  }

  return success(res, `Cart with id '${id}' successfully updated`, {
    user_id,
    product_id,
    quantity,
  });
};

const deleteCart = async (req, res) => {
  const { id } = req.user;

  const removed = await cartRepository.removeCartById(id);
  if (!removed) {
    return fail(res, `Cart with user_id '${id}' is empty`);
  }

  return success(res, `Cart with id '${id}' successfully deleted`, {});
};

module.exports = {
  getAllCart,
  addCart,
  updateCart,
  deleteCart,
};
