const categoryRepository = require('./categoryRepository');
const { Product } = require('../models');

const findByCategory = async (category) => {
  const foundCategory = await categoryRepository.findByName(category);

  if (!foundCategory) return null;
  return Product.findAll({
    where: { category_id: foundCategory.id },
    include: 'category',
  });
};

const findOne = ((criteria) => Product.findOne(criteria));

const findAll = ((criteria) => Product.findAll(criteria));

module.exports = { findByCategory, findOne, findAll };
