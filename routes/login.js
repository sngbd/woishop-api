const loginRouter = require('express').Router();
const login = require('../controllers/login');

loginRouter.post('/', login.userLogin);
loginRouter.get('/google', login.googleOAuth);
loginRouter.get('/google/callback', login.googleOAuthCallback);
loginRouter.get('/success', login.successLogin);
loginRouter.get('/fail', login.failLogin);

module.exports = loginRouter;
