const response_helper = (success, message, data) => {
  return {
    success: success,
    message: message,
    data: data
  }
};

module.exports = response_helper;