const BaseRepository = require('./BaseRepository');
const { User } = require('../models');

const base = new BaseRepository(User);

const createUser = ((user) => base.create(user));

const findOne = ((criteria) => base.one(criteria));

const findAll = ((criteria) => base.all(criteria));

const updateUser = ((user, column, value) => base.update(user, column, value));

module.exports = {
  createUser,
  findOne,
  findAll,
  updateUser,
};
