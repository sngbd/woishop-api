const productsRouter = require('express').Router();
const pool = require('../data/db');
const responseHelper = require('../utils/responseHelper');

// GET List Category
productsRouter.get('/categories', async (_req, res) => {
  const categories = await pool.query('SELECT DISTINCT category FROM product');
  const categoriesList = categories.rows.map((data) => data.category);

  if (!categoriesList.length) {
    return res.status(404).json(
      responseHelper(false, 'Categories not found', {}),
    );
  }

  return res.json(
    responseHelper(true, 'Categories found', categoriesList),
  );
});

// GET Single Product
productsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await pool.query('SELECT * FROM product WHERE id=$1', [id]);

  if (!product.rows.length) {
    return res.status(404).json(
      responseHelper(false, 'Product not found', {}),
    );
  }

  return res.json(
    responseHelper(true, 'Product found', product.rows[0]),
  );
});

// GET List Product by Category
productsRouter.get('/categories/:category', async (req, res) => {
  const { category } = req.params;
  const products = await pool.query('SELECT * FROM product WHERE category=$1', [category]);

  if (!products.rows.length) {
    return res.status(404).json(
      responseHelper(false, 'Category not found', {}),
    );
  }

  return res.json(
    responseHelper(true, 'Category found', products.rows),
  );
});

// GET List All Product
productsRouter.get('/', async (_req, res) => {
  const allProducts = await pool.query('SELECT * FROM product');

  if (!allProducts.rows.length) {
    return res.status(404).json(
      responseHelper(false, 'Products not found', {}),
    );
  }

  return res.json(
    responseHelper(true, 'Products found', allProducts.rows),
  );
});

module.exports = productsRouter;
