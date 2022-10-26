const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
// const session = require('express-session');
const cookieSession = require('cookie-session');
const postsRouter = require('./routes/posts')
const app = express();
require("./utils/passport-setup")


app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieSession({
  name:'bestPet',
  keys:['key1','key2']
}));

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

const MONGODB_URI =
'mongodb+srv://vladster1511:Vlad32531996@udemycourse.seqle67.mongodb.net/?retryWrites=true&w=majority';

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(postsRouter)

const isLoggedIn = (req, res, next) => {
  if (req.user)
      next()
  else
      res.sendStatus(401)
}



app.get('/failed',(req,res) => {res.render('failed',{user: req.user?.displayName})})
app.get('/good', isLoggedIn, (req,res) => {res.render('failed',{user:req.user?.displayName})})

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  (req, res) => {
      // Successful authentication, redirect home.
        res.redirect('/good');
    });

    app.get("/logout", (req, res) => {
      req.session = null;
      req.logout(() => {
          console.log('super');
      });
      console.log('yOU HAVE BEEN LOGGED OUT');
      res.redirect('/');
  })


mongoose
  .connect(MONGODB_URI)
  .then((_)=> app.listen(3000))
  .catch(err => {
    console.log(err);
  });
