const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const session = require('express-session');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const postsRouter = require('./routes/posts');
const authRouter = require('./routes/auth');
const DbConnection = require('./utils/DbConnection');
// comment for cherry-pick
require('dotenv').config()

const app = express();
const mongoDb = new DbConnection(process.env.MONGO_DB_URI);

app
.use(cookieSession({name:'bestPet',keys:['key1','key2']}))
.use(bodyParser.urlencoded({ extended: true }))
.use(passport.initialize())
.use(passport.session())
.use(express.static(path.join(__dirname, 'public')))
.use('/uploads', express.static(path.join(__dirname, 'uploads')))
.use(cors())
.use(postsRouter)
.use(cookieParser())
.use(authRouter)
.set('view engine', 'ejs')
.set('views', 'views')

mongoDb.connect().then(()=> app.listen(3000, () => console.log('Server has been started')))
.catch(err => {
  console.log(err);
});

 


  