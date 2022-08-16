const productsRouter = require('express').Router();
const pool = require('../data/db');

// GET List Category
productsRouter.get('/categories', async (_req, res) => {
  const categories = await pool.query("SELECT category FROM product");
  const categories_list = categories.rows.map(data => data.category);

  if (!categories_list.length) {
    return res.status(404).json({
      success: false, 
      message: "Categories not found", 
      data: {} 
    });
  }

  res.json({
    success: true, 
    message: "Categories found", 
    data: { 
      categories: categories_list 
    } 
  });
});

// GET Single Product
productsRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const product = await pool.query("SELECT * FROM product WHERE id=$1", [id]);

  if (!product.rows.length) {
    return res.status(404).json({
      success: false, 
      message: "Product not found", 
      data: {} 
    });
  }

  res.json({
    success: true, 
    message: "Product found", 
    data: { 
      product: product.rows[0]
    } 
  });
});

// GET List Product by Category
productsRouter.get('/categories/:category', async (req, res) => {
  const category = req.params.category;
  const products = await pool.query("SELECT * FROM product WHERE category=$1", [category]);

  if (!products.rows.length) {
    return res.status(404).json({
      success: false, 
      message: "Category not found", 
      data: {} 
    });
  }

  res.json({
    success: true, 
    message: "Category found", 
    data: { 
      products: products.rows
    } 
  });
});

// GET List All Product
productsRouter.get('/', async (_req, res) => {
  const allProducts = await pool.query("SELECT * FROM product");

  if (!allProducts.rows.length) {
    return res.status(404).json({
      success: false, 
      message: "Products not found", 
      data: {} 
    });
  }

  res.json({
    success: true, 
    message: "Products found", 
    data: { 
      products: allProducts.rows
    } 
  });
});

module.exports = productsRouter;