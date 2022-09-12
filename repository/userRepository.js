const { User } = require('../models');

const createUser = ((user) => User.create(user));

const findOne = ((criteria) => User.findOne(criteria));

const findAll = ((criteria) => User.findAll(criteria));

const updateUser = ((user, value) => User.update(user, value));

module.exports = {
  createUser,
  findOne,
  findAll,
  updateUser,
};
