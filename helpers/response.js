const success = (res, message, data) => {
  res.json({
    success: true,
    message,
    data,
  });
};

const fail = (res, message) => {
  res.json({
    success: false,
    message,
    data: {},
  });
};

module.exports = { success, fail };
