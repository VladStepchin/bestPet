const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_SECRET_CLIENTID = '190926277705-bfsu2isgdjj8eaa3nt77de1ugagcsmet.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'


// записує в кукі?
passport.serializeUser((user, done)=> {
  done(null, user)
});

//видаляє з кукі
passport.deserializeUser((user, done)=> {
  // User.findById(id, (err,user)=>{
  //   done(err, user)
  // })
  done(null, user)
})

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_SECRET_CLIENTID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // use the profile info (mainly profile id to check if the user is registered in your DB)

    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });

    //alternatively it could be taken from DB is it exist there
    return done(null, profile)
  }
));