const BaseRepository = require('./BaseRepository');
const { Category } = require('../models');

const base = new BaseRepository(Category);

const findByName = ((name) => base.one({
  where: { name },
}));

const findAll = (() => base.all());

module.exports = { findByName, findAll };
