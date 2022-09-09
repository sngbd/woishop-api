const BaseRepository = require('./BaseRepository');
const { User } = require('../models');

const base = new BaseRepository(User);

const createUser = ((user) => base.create(user));

const findOne = ((criteria) => base.one(criteria));

const findAll = ((criteria) => base.all(criteria));

const updateUser = ((user, value) => base.update(user, value));

module.exports = {
  createUser,
  findOne,
  findAll,
  updateUser,
};
