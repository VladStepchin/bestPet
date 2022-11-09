const Role = require("../models/Role.js");
const UserJWT = require("../models/UserJWT.js");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const User = require("../models/GoogleUser.js");
const JWT = require("jsonwebtoken");
require("dotenv").config();

const { off } = require("../models/GoogleUser.js");

const generateAccessToken = (id, roles, email) => {
  const payload = {
    id,
    roles,
    email,
  };
  return JWT.sign(payload, process.env.SECRET, { expiresIn: "24h" });
};

class AuthJWTController {
  static async registrationJWT(req, res) {
    try {
      const { email, password } = req.body;
      const candidate = await UserJWT.findOne({ email });

      if (candidate) {
        return res
          .status(400)
          .json({ message: "User has been already created" });
      }
      const hashedPassword = bcrypt.hashSync(password, 5);
      const userRole = await Role.findOne({ value: "ADMIN" });
      const userJWT = new UserJWT({
        email,
        password: hashedPassword,
        roles: [userRole.value],
      });
      await userJWT.save();
      return res.json({ message: "User has been successfully create" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Registration error" });
    }
  }
  static async loginJWT(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserJWT.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "The user has not been found" });
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "The password is incorrect" });
      }
      const token = generateAccessToken(user._id, user.roles, user.email);

      res.cookie("token", token, { httpOnly: true });

      console.log("You have been successfully signed in");

      return res.status(200).json({ token });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Login erroґ`r" });
    }
  }

  static async logOut(req, res) {
    req.logout((err) => {
      if (err) return err;
    });
    res.clearCookie("token");

    return res.redirect("/");
  }

  static async getUsers(req, res) {
    try {
      let users = await UserJWT.find();
      res.json(users);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = AuthJWTController;
``