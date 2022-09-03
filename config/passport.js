const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../models');

passport.serializeUser(async (user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/api/login/google/callback',
  },
  (async (accessToken, refreshToken, profile, done) => {
    const { sub, name, email } = profile._json;
    const foundUser = await User.findOne({
      where: { email },
    });

    if (foundUser) {
      if (foundUser.password_hash) {
        return done(null, false);
      }
    }
    else {
      await User.create({
        sub, name, email, verified: true,
      });
    }

    done(null, profile);
  }),
));
