const productsRouter = require('express').Router();
const response = require('../helpers/response');
const { userExtractor } = require('../utils/middleware');
const { Product, Category } = require('../models');

productsRouter.get('/categories', async (req, res) => {
  // GET List Product by Category
  const { category } = req.query;
  if (category) {
    const foundCategory = await Category.findOne({
      where: { name: category },
    });

    if (!foundCategory) {
      return res.json(
        response(false, `Category '${category}' not found`, {}),
      );
    }

    const products = await Product.findAll({
      where: { category_id: foundCategory.id },
      include: 'category',
    });

    return res.json(
      response(true, `Category '${category}' found`, products),
    );
  }

  // GET List Category
  const categories = await Category.findAll();
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
  const product = await Product.findOne({
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
  const products = await Product.findAll({
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
