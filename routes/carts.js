const cartsRouter = require('express').Router();
const { userExtractor } = require('../utils/middleware');
const cart = require('../controllers/carts');

cartsRouter.get('/', userExtractor, cart.getAllCart);
cartsRouter.post('/', userExtractor, cart.addCart);
cartsRouter.put('/', userExtractor, cart.updateCart);
cartsRouter.delete('/', userExtractor, cart.deleteCart);

module.exports = cartsRouter;
