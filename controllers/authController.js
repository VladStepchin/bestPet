const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

const GOOGLE_CLIENT_SECRET_CLIENTID =
  "190926277705-bfsu2isgdjj8eaa3nt77de1ugagcsmet.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

// записує в кукі?
passport.serializeUser((user, done) => {
  done(null, user);
});

//видаляє з кукі
passport.deserializeUser(async (user, done) => {
    let userFromDb = await User.findOne({ googleId: user.googleId });
    done(null, userFromDb);
});

passport.use(
  new GoogleStrategy({
      clientID: GOOGLE_CLIENT_SECRET_CLIENTID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/login/callback",
    }, async (accessToken, refreshToken, profile, done) => {
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);
        const authorizedUser = await User.findOne({ googleId: profile.id });

        if (!authorizedUser) {
            let user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            imageUrl: profile.photos[0].value,
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
