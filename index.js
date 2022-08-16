require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./data/db');

app.use(cors());

// GET List Category
app.get('/api/products/categories', async (_req, res) => {
  const categories = await pool.query("SELECT category FROM product");
  const categories_list = categories.rows.map(data => data.category);
  res.json(categories_list);
});

// GET Single Product
app.get('/api/products/:id', async (req, res) => {
  const id = req.params.id;
  const product = await pool.query("SELECT * FROM product WHERE id=($1)", [id]);
  res.json(product.rows);
});

// GET List Product by Category
app.get('/api/products/categories/:category', async (req, res) => {
  const category = req.params.category;
  const products = await pool.query("SELECT * FROM product WHERE category=($1)", [category]);
  res.json(products.rows);
});

// GET List All Product
app.get('/api/products', async (_req, res) => {
  const allProducts = await pool.query("SELECT * FROM product");
  res.json(allProducts.rows);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});