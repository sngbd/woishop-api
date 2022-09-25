const usersRouter = require('express').Router();
const user = require('../controllers/users');

usersRouter.post('/', user.registerUser);
usersRouter.post('/verify', user.verifyUser);
usersRouter.post('/resendOTP', user.resendOTP);

module.exports = usersRouter;
