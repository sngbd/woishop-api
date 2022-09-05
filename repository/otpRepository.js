const BaseRepository = require('./BaseRepository');
const { OTP } = require('../models');

const base = new BaseRepository(OTP);

const createOTP = ((otp) => base.create(otp));

const findOne = ((criteria) => base.one(criteria));

const findAll = ((criteria) => base.all(criteria));

const removeOTP = ((otp) => base.remove(otp));

module.exports = {
  createOTP,
  findOne,
  findAll,
  removeOTP,
};
