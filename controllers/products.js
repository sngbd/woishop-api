const productsRouter = require('express').Router();
const pool = require('../data/db');
const response = require('../helpers/response');
const { queryAllProduct, selectAllProduct } = require('../helpers/query');
const { userExtractor } = require('../utils/middleware');

productsRouter.get('/categories', userExtractor, async (req, res) => {
  // GET List Product by Category
  const { category } = req.query;
  if (category) {
    const { rows } = await pool.query(`${selectAllProduct} WHERE category=$1`, [category]);

    if (!rows.length) {
      return res.json(
        response(false, `Category '${category}' not found`, {}),
      );
    }

    return res.json(
      response(true, `Category '${category}' found`, rows),
    );
  }

  // GET List Category
  const { rows } = await pool.query('SELECT * FROM category');
  const categoriesList = rows.map((data) => data.name);

  if (!categoriesList.length) {
    return res.json(
      response(false, 'All categories not found', {}),
    );
  }

  return res.json(
    response(true, 'All categories found', categoriesList),
  );
});

// GET Single Product
productsRouter.get('/:id', userExtractor, async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(`${selectAllProduct} WHERE id=$1`, [id]);

  if (!rows.length) {
    return res.json(
      response(false, `Product with id '${id}' not found`, {}),
    );
  }

  return res.json(
    response(true, `Product with id '${id}' found`, rows[0]),
  );
});

productsRouter.get('/', userExtractor, async (_req, res) => {
  const { rows } = await pool.query(queryAllProduct);

  if (!rows.length) {
    return res.json(
      response(false, 'All products not found', {}),
    );
  }

  return res.json(
    response(true, 'All products found', rows),
  );
});

module.exports = productsRouter;
