const router = require("express").Router();
const passport = require("passport");
const AuthJWTController = require("../controllers/AuthJWTController");
const OAuthController = require("../controllers/OAuthController")
const { check } = require("express-validator");
const authMiddleware = require("../middleware/AuthMiddleware");

require("../controllers/OAuthController");

router.get("/login", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/failed", OAuthController.handleFailedLogin);
router.get("/login/callback",OAuthController.handleLoginCallback) 
router.get("/logout", OAuthController.handleLogOut);

// -----------------------------------------------------
// JWT AUTHORIZATION

router.post("/loginJWT", AuthJWTController.loginJWT);
router.post("/registrationJWT", AuthJWTController.registrationJWT);
router.get("/users", authMiddleware.auth, AuthJWTController.getUsers);

module.exports = router;
