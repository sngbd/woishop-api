const BaseRepository = require('./BaseRepository');
const categoryRepository = require('./categoryRepository');
const { Product } = require('../models');

const base = new BaseRepository(Product);

const findByCategory = async (category) => {
  const foundCategory = await categoryRepository.findByName(category);

  if (!foundCategory) return null;
  return base.all({
    where: { category_id: foundCategory.id },
    include: 'category',
  });
};

const findOne = ((criteria) => base.one(criteria));

const findAll = ((criteria) => base.all(criteria));

module.exports = { findByCategory, findOne, findAll };
