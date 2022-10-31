const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GoogleUser = require("../models/GoogleUser");
require("dotenv").config();

passport.serializeUser((user, done) => {
  console.log("Serialization", user);
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  let userFromDb = await GoogleUser.findOne({ googleId: user.googleId });
  done(null, userFromDb);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_SECRET_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/login/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const authorizedUser = await GoogleUser.findOne({ googleId: profile.id });

      if (!authorizedUser) {
        const user = new GoogleUser({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          imageUrl: profile.photos[0].value,
        });
        await user.save().catch((err) => {
          console.log(err);
        });
        return done(null, user);
      }
      return done(null, authorizedUser);
    }
  )
);

class OAuthController {
  static async handleLogin(req, res) {
   return  passport.authenticate("google", { scope: ["profile", "email"] });
  }

  static async handleLoginCallback(req, res) {
    passport.authenticate("google", { failureRedirect: "/failed" }),
      (req, res) => {
        return res.redirect("/");
      };
  }

  static async handleLogOut(req, res) {
    req.session = null;
    return req.logout(() => {
      res.cookie("token", "", { httpOnly: true });
      console.log("You have been logged out");
      return res.redirect("/");
    });
  }

  static async handleFailedLogin(req,re) {
    return res.json({'message':'Login has failed'})
  }
}

module.exports = OAuthController;
