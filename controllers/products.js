const productsRouter = require('express').Router();
const pool = require('../data/db');

// GET List Category
productsRouter.get('/categories', async (_req, res) => {
  const categories = await pool.query("SELECT category FROM product");
  const categories_list = categories.rows.map(data => data.category);
  res.json(categories_list);
});

// GET Single Product
productsRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const product = await pool.query("SELECT * FROM product WHERE id=($1)", [id]);
  res.json(product.rows);
});

// GET List Product by Category
productsRouter.get('/categories/:category', async (req, res) => {
  const category = req.params.category;
  const products = await pool.query("SELECT * FROM product WHERE category=($1)", [category]);
  res.json(products.rows);
});

// GET List All Product
productsRouter.get('/', async (_req, res) => {
  const allProducts = await pool.query("SELECT * FROM product");
  res.json(allProducts.rows);
});

module.exports = productsRouter;