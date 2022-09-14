const productsRouter = require('express').Router();
const { success, fail } = require('../helpers/response');
const productRepository = require('../repository/productRepository');
const categoryRepository = require('../repository/categoryRepository');

productsRouter.get('/categories', async (req, res) => {
  const { category } = req.query;
  if (category) {
    const products = await productRepository.findByCategory(category);

    if (!products) {
      return fail(res, `Category '${category}' not found`);
    }

    return success(res, `Category '${category}' found`, products);
  }

  const categories = await categoryRepository.findAll();
  const categoriesList = categories.map((data) => data.name);

  if (!categoriesList) {
    return fail(res, 'All categories not found');
  }

  return success(res, 'All categories found', categoriesList);
});

productsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productRepository.findOne({
    where: { id },
    include: 'category',
  });

  if (!product) {
    return fail(res, `Product with id '${id}' not found`);
  }

  return success(res, `Product with id '${id}' found`, product);
});

productsRouter.get('/', async (_req, res) => {
  const products = await productRepository.findAll({
    include: 'category',
  });

  if (!products) {
    return fail(res, 'All products not found');
  }

  return success(res, 'All products found', products);
});

module.exports = productsRouter;
