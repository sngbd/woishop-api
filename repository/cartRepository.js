const { sequelize } = require('../models/index');
const BaseRepository = require('./BaseRepository');
const { User, Product, Cart } = require('../models');

const userBase = new BaseRepository(User);
const cartBase = new BaseRepository(Cart);

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
  const allCarts = await userBase.all(options);
  return allCarts;
});

const findCartByUserId = (async (user_id) => {
  options.where = { id: user_id };
  const cart = await userBase.one(options);
  return cart;
});

const createCart = (async (cart) => {
  const { id, products } = cart;
  for (const product of products) {
    product.user_id = id;
  }
  const newCart = await queryInterface.bulkInsert('carts', products);
  return newCart;
});

const updateCart = (async (cart, value) => {
  const updatedCart = await cartBase.update(cart, value);
  return updatedCart;
});

const removeCartById = (async (user_id) => {
  await Cart.destroy({
    where: { user_id },
  });
});

module.exports = {
  findCartByUserId,
  findAllCarts,
  createCart,
  updateCart,
  removeCartById,
};
