const { Category } = require('../models');

const findByName = ((name) => Category.findOne({
  where: { name },
}));

const findAll = (() => Category.findAll());

module.exports = { findByName, findAll };
