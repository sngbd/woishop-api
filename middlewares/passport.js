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
    callbackURL: process.env.CALLBACK_URL,
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
    } else {
      await User.create({
        sub, name, email, verified: true,
      });
    }

    const user = profile;

    const { id } = await User.findOne({
      where: { sub },
    });

    user.id = id;
    user.accessToken = accessToken;

    return done(null, user);
  }),
));
