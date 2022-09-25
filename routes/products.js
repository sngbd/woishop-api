const productsRouter = require('express').Router();
const product = require('../controllers/products');

productsRouter.get('/', product.getAllProduct);
productsRouter.get('/:id', product.getProductById);
productsRouter.get('/categories', product.getAllCategory);

module.exports = productsRouter;
