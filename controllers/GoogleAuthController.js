const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const UserModule = require("../modules/UserModule")

require('dotenv').config()

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
    let userFromDb = await UserModule.findByCriteria({ googleId: user.googleId });
    done(null, userFromDb);
});

passport.use(
  new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_SECRET_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/login/callback",
    }, async (accessToken, refreshToken, profile, done) => {
        const authorizedUser = await UserModule.findByCriteria({ googleId: profile.id });

        if (!authorizedUser) {
            const user = await UserModule.create({
              googleId: profile.id,
              email: profile.emails[0].value,
              poster: profile.photos[0].value,
              roles: ["USER"]})
            .catch((err) => {
                console.log(err);
            });
            return done(null, user);
        }
        return done(null, authorizedUser);
    }
  )
);
