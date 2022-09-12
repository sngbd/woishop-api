const { sequelize } = require('../models/index');
const { User, Product, Cart } = require('../models');

const queryInterface = sequelize.getQueryInterface();

const options = {
  attributes: ['id'],
  include: [{
    model: Product,
    through: { attributes: ['quantity'] },
    as: 'products',
  }],
};

const findAllCarts = (async () => {
  const carts = await User.findAll(options);
  const allCarts = [];
  for (const cart of carts) {
    if (cart.products.length) {
      allCarts.push(cart);
    }
  }
  return allCarts;
});

const findCartByUserId = (async (user_id) => {
  options.where = { id: user_id };
  const cart = await User.findOne(options);
  if (!cart || !cart.products.length) return null;
  return cart;
});

const createCart = (async (cart) => {
  const { id, products } = cart;
  const newProducts = [];
  for (const product of products) {
    const { product_id } = product;
    const productAdded = await Cart.findOne({
      where: { user_id: id, product_id },
    });
    if (productAdded) return null;
    product.user_id = id;
    if (product.quantity) newProducts.push(product);
  }
  const newCart = await queryInterface.bulkInsert('carts', newProducts);
  return newCart;
});

const removeCartById = (async (user_id) => {
  const exists = await Cart.findOne({
    where: { user_id },
  });
  if (exists) {
    await Cart.destroy({
      where: { user_id },
    });
  } else {
    return null;
  }
});

module.exports = {
  findCartByUserId,
  findAllCarts,
  createCart,
  removeCartById,
};
