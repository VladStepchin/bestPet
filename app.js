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

// middleware for login add to app.use(loginMiddleware) to check if it applies to every route
require('dotenv').config()

const app = express();
const config = require('./settings/config');

config.init('http://localhost:3010')
.then(() => require('./settings/db')(config.getData().mongo))
.then(()=>{
  app
  .use(cookieSession({name:'bestPet',keys:['key1','key2']}))
  .use(cookieParser())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(passport.initialize())
  .use(passport.session())
  .use(express.static(path.join(__dirname, 'public')))
  .use('/uploads', express.static(path.join(__dirname, 'uploads')))
  .use(cors())
  .use(postsRouter)
  .use(authRouter)
  .set('view engine', 'ejs')
  .set('views', 'views')
  .listen(config.getData().app.port, () => console.log("Server has been started"));
})


// //refactor (video 2)
// mongoDb.connect().then(()=> app.listen(3000, () => console.log('Server has been started')))
// .catch(err => {
//   console.log(err);
// });

 


  