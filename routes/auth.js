
const router = require('express').Router();
const passport = require('passport');
const authController = require('../controllers/authController')


require("../controllers/authController")

//research
const isLoggedIn = (req, res, next) => {
    if (req.user)
        next()
    else
        res.sendStatus(401)
  }
 
router.get('/failed',(req,res) => {res.json({message:'login failed'})})

router.get('/good', isLoggedIn, (req,res) => {res.render('failed',{user:req.user?.displayName})})

router.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/login/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  (req, res) => {
      // Successful authentication, redirect home.
        res.redirect('/');
    });

router.get("/logout", (req, res) => {
    req.session = null;
    req.logout(() => {
        console.log('super');
    });
    console.log('yOU HAVE BEEN LOGGED OUT');
    res.redirect('/');
  })

  module.exports = router;