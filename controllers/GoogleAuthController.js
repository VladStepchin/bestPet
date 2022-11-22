const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const UserService = require("../modules/UserService");
const Repository = require("../core/Repository");

const userService = new UserService(new Repository(User));
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_SECRET_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/login/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const authorizedUser = await userService.findOne({
        googleId: profile.id,
      });

      if (!authorizedUser) {
        const user = await userService
          .create({
            googleId: profile.id,
            email: profile.emails[0].value,
            poster: profile.photos[0].value,
            roles: ["USER"],
          })
          .catch((err) => {
            console.log(err);
          });
        return done(null, user);
      }
      return done(null, authorizedUser);
    }
  )
);

class GoogleAuthController {
  static serializeUser = passport.serializeUser((user, done) => {
    done(null, user);
  });

  static deserializeUser = passport.deserializeUser(async (user, done) => {
    let userFromDb = await userService.findOne({ googleId: user.googleId });
    done(null, userFromDb);
  });

  static login = passport.authenticate("google", {
    scope: ["profile", "email"],
  });
  static authenticate = passport.authenticate("google", {
    failureRedirect: "/failed",
  });

  static failedToLogin = () => new Error("Login via Google failed");

  static redirectToStart (req, res) {
    res.redirect("/");
  }
}

module.exports = GoogleAuthController;
