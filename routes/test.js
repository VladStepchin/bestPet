// переробити на клас  і закинути в auth
const passport = require("passport");

const loginToGoogle = passport.authenticate("google", { scope: ["profile", "email"] });

module.exports = loginToGoogle