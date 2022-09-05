const productsRouter = require('express').Router();
const response = require('../helpers/response');
const { userExtractor } = require('../utils/middleware');
const productRepository = require('../repository/productRepository');
const categoryRepository = require('../repository/categoryRepository');

productsRouter.get('/categories', async (req, res) => {
  // GET List Product by Category
  const { category } = req.query;
  if (category) {
    const products = await productRepository.findByCategory(category);

    if (!products) {
      return res.json(
        response(false, `Category '${category}' not found`, {}),
      );
    }

    return res.json(
      response(true, `Category '${category}' found`, products),
    );
  }

  // GET List Category
  const categories = await categoryRepository.findAll();
  const categoriesList = categories.map((data) => data.name);

  if (!categoriesList) {
    return res.json(
      response(false, 'All categories not found', {}),
    );
  }

  return res.json(
    response(true, 'All categories found', categoriesList),
  );
});

// GET Single Product
productsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productRepository.findOne({
    where: { id },
    include: 'category',
  });

  if (!product) {
    return res.json(
      response(false, `Product with id '${id}' not found`, {}),
    );
  }

  return res.json(
    response(true, `Product with id '${id}' found`, product),
  );
});

// GET All Product
productsRouter.get('/', userExtractor, async (_req, res) => {
  const products = await productRepository.findAll({
    include: 'category',
  });

  if (!products) {
    return res.json(
      response(false, 'All products not found', {}),
    );
  }

  return res.json(
    response(true, 'All products found', products),
  );
});

module.exports = productsRouter;
