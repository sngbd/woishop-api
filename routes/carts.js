const cartsRouter = require('express').Router();
const { userExtractor } = require('../middlewares/auth');
const validator = require('../middlewares/validators/carts');
const cart = require('../controllers/carts');

cartsRouter.get('/', userExtractor, cart.getAllCart);
cartsRouter.post('/', userExtractor, validator.addCart, cart.addCart);
cartsRouter.put('/', userExtractor, validator.updateCart, cart.updateCart);
cartsRouter.delete('/', userExtractor, cart.deleteCart);

module.exports = cartsRouter;
