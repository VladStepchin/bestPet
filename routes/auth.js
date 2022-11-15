const router = require("express").Router();
const passport = require("passport");
const AuthJWTController = require("../controllers/JWTAuthController");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/AuthMiddleware");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
});

require("../controllers/GoogleAuthController");

router.get("/failed", (req, res) => {
  res.json({
    message: "login failed",
  });
});

router.get(
  "/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/login/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  (req, res) => {
    res.redirect("/");
  }
);

router.get("/logout", AuthJWTController.logOut);
router.post("/loginJWT", AuthJWTController.loginJWT);
router.post(
  "/registrationJWT",
  upload.single("poster"),
  AuthJWTController.registrationJWT
);
router.get("/users", authMiddleware.auth, AuthJWTController.getUsers);

module.exports = router;
