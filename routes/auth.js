const router = require("express").Router();

const HttpError = require("../modules/Utils");
const authMiddleware = require("../middleware/AuthMiddleware");
const fileUploadMiddleware = require("../middleware/fileUploadMiddleware");
const User = require("../models/User");
const Role = require("../models/Role");

const AuthJWTController = require("../controllers/AuthJWTController");
const Repository = require("../core/Repository");
const UserService = require("../modules/UserService");
const RoleService = require("../modules/RoleService");
const JWTAuthService = require("../modules/JWTAuthService");
const GoogleAuthController = require("../controllers/GoogleAuthController");

const jwtAuthService = new JWTAuthService(
  new UserService(new Repository(User)),
  new RoleService(new Repository(Role))
);

const authJWTController = new AuthJWTController(jwtAuthService);

router.get("/failed", GoogleAuthController.failedToLogin);

router.get("/login", GoogleAuthController.login);

router.get(
  "/login/callback",
  GoogleAuthController.authenticate,
  GoogleAuthController.redirectToStart
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
