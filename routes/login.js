const loginRouter = require('express').Router();
const validator = require('../middlewares/validators/login');
const login = require('../controllers/login');

loginRouter.post('/', validator.userLogin, login.userLogin);
loginRouter.get('/google', login.googleOAuth);
loginRouter.get('/google/callback', login.googleOAuthCallback);
loginRouter.get('/success', login.successLogin);
loginRouter.get('/fail', login.failLogin);

module.exports = loginRouter;
