const router = require("express").Router();
const passport = require("passport");
const HttpError = require("../modules/Utils");
const authMiddleware = require("../middleware/AuthMiddleware");
const fileUploadMiddleware = require("../middleware/fileUploadMiddleware");
const User = require("../models/User");
const Role = require("../models/Role");

const AuthJWTController = require("../controllers/AuthJWTController");
const Repository = require("../core/Repository");
const UserService = require("../modules/UserService");
const RoleService = require("../modules/RoleService");
const JWTAuthProvider = require("../modules/JWTAuthProvider");

const jwtAuthProvider = new JWTAuthProvider(
  new UserService(new Repository(User)),
  new RoleService(new Repository(Role))
);
const authJWTController = new AuthJWTController(jwtAuthProvider);

require("../controllers/GoogleAuthController");

const login = require("./test");

router.get("/failed", (req, res) => {
  return new HttpError("Login via Google failed");
});

router.get(
  "/login", login
  
);

router.get(
  "/login/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  (req, res) => {
    res.redirect("/");
  }
);

router.get("/logout",
    authJWTController.logOut.bind(authJWTController));
router.post("/loginJWT",
    authJWTController.loginJWT.bind(authJWTController));
router.post(
    "/registrationJWT",
    fileUploadMiddleware.single("poster"),
    authJWTController.registrationJWT.bind(authJWTController)
);
router.get(
    "/users",
    authMiddleware.auth,
    authJWTController.getUsers.bind(authJWTController)
);

module.exports = router;
