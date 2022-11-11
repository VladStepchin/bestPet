const Role = require("../models/Role.js");
const User = require("../models/User.js").model;
const bcrypt = require("bcrypt");
// const { validationResult } = require("express-validator");
const JWT = require("jsonwebtoken");
const session = require('express-session');

require("dotenv").config();

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
      const candidate = await User.findOne({ email });

      if (candidate) {
        return res
          .status(400)
          .json({ message: "User has been already created" });
      }
      const hashedPassword = bcrypt.hashSync(password, 5);
      const userRole = await Role.findOne({ value: "ADMIN" });
      const user = new User({
        email,
        password: hashedPassword,
        imageUrl: '',
        roles: [userRole.value],
      });
      await user.save();
      return res.json({ message: "User has been successfully create" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Registration error" });
    }
  }
  static async loginJWT(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "The user has not been found" });
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "The password is incorrect" });
      }
      const token = await generateAccessToken(user._id, user.roles, user.email);
      
      console.log("TOKEN", token);
      console.log("You have been successfully signed in");
      res.cookie("token", token, { httpOnly: true });

      return res.redirect("/getPostsByUser")
      
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Login erroґ`r" });
    }
  }

  static async logOut(req, res) {
    res.clearCookie("token");
    req.logout((err) => {
      if (err) return err;
    });
    return res.redirect("/");
  }

  static async getUsers(req, res) {
    try {
      let users = await User.find();
      res.json(users);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = AuthJWTController;
``