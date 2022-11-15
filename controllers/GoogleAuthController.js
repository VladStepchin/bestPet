const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User").model;

require('dotenv').config()

// записує в кукі
passport.serializeUser((user, done) => {
  console.log('Serialization', user);
  done(null, user);
});

//видаляє з кукі
passport.deserializeUser(async (user, done) => {
    let userFromDb = await User.findOne({ googleId: user.googleId });
    done(null, userFromDb);
});

passport.use(
  new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_SECRET_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/login/callback",
    }, async (accessToken, refreshToken, profile, done) => {
        const authorizedUser = await User.findOne({ googleId: profile.id });

        if (!authorizedUser) {
            const user = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            poster: profile.photos[0].value,
            roles: ["USER"]
            });
            await user
            .save()
            .catch((err) => {
                console.log(err);
            });
            return done(null, user);
        }
        return done(null, authorizedUser);
    }
  )
);