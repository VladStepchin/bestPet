const router = require("express").Router();
const passport = require("passport");
const AuthJWTController = require("../controllers/authJWTController");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");

require("../controllers/authController");

//research
const isLoggedIn = (req, res, next) => {
  if (req.user) next();
  else res.sendStatus(401);
};

router.get("/failed", (req, res) => {
  res.json({
    message: "login failed",
  });
});

router.get("/good", isLoggedIn, (req, res) => {
  res.render("failed", {
    user: req.user?.displayName,
  });
});

router.get("/login", passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/login/callback",passport.authenticate("google", { failureRedirect: "/failed" }),(req, res) => {
    res.redirect("/");
  }
);

router.get("/logout", (req, res) => {req.session = null;
    
  req.logout(() => {
    
    console.log("super");
  });

  console.log("You have been logged out");
  
  res.redirect('/')

});

// -----------------------------------------------------
// JWT AUTHORIZATION

router.post("/loginJWT", AuthJWTController.loginJWT);
router.post("/registrationJWT", AuthJWTController.registrationJWT);
router.get("/users", authMiddleware.auth, AuthJWTController.getUsers);

module.exports = router;
