const productsRouter = require('express').Router();
const product = require('../controllers/products');

productsRouter.get('/categories', product.getAllCategory);
productsRouter.get('/', product.getAllProduct);
productsRouter.get('/:id', product.getProductById);

module.exports = productsRouter;
