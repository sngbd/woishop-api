const { OTP } = require('../models');

const createOTP = ((otp) => OTP.create(otp));

const findOne = ((criteria) => OTP.findOne(criteria));

const findAll = ((criteria) => OTP.findAll(criteria));

const removeOTP = ((otp) => OTP.destroy(otp));

module.exports = {
  createOTP,
  findOne,
  findAll,
  removeOTP,
};
