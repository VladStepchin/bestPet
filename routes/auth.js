const router = require("express").Router();
const passport = require("passport");
const AuthJWTController = require("../controllers/JWTAuthController");
const authMiddleware = require("../middleware/AuthMiddleware");
const fileUploadMiddleware = require('../middleware/fileUploadMiddleware')

require("../controllers/GoogleAuthController");

router.get("/failed", (req, res) => {
  return new HttpError('Login via Google failed')
});

router.get(
  "/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/login/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

router.get("/logout", AuthJWTController.logOut);
router.post("/loginJWT", AuthJWTController.loginJWT);
router.post("/registrationJWT", fileUploadMiddleware.single("poster"), AuthJWTController.registrationJWT);
router.get("/users", authMiddleware.auth, AuthJWTController.getUsers);

module.exports = router;
