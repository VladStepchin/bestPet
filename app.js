const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
// const session = require('express-session');
const cookieSession = require('cookie-session');
const postsRouter = require('./routes/posts');
const authRouter = require('./routes/auth');

const app = express();


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
app.use(authRouter)

mongoose
  .connect(MONGODB_URI)
  .then((_)=> app.listen(3000))
  .catch(err => {
    console.log(err);
  });
