const usersRouter = require('express').Router();
const user = require('../controllers/users');
const validator = require('../utils/validators/users');

usersRouter.post('/', validator.registerUser, user.registerUser);
usersRouter.post('/verify', validator.verifyUser, user.verifyUser);
usersRouter.post('/resendOTP', validator.resendOTP, user.resendOTP);

module.exports = usersRouter;
