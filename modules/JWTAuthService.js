const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

class JWTAuthProvider {
  constructor(userService, roleService) {
    this.userService = userService;
    this.roleService = roleService;
  }

  _generateAccessToken(id, roles, email, poster) {
    const payload = {
      id,
      roles,
      email,
      poster,
    };
    return JWT.sign(payload, process.env.SECRET, { expiresIn: "24h" });
  }

  async registration(anonymousUser) {
    try {
      const userRecord = await this.userService.findOne({
        email: anonymousUser.email,
      });

      if (userRecord) {
        return { message: "User has been already created" };
      }

      anonymousUser.role = this.roleService.findOne({ value: "ADMIN" });
      const hashedPassword = bcrypt.hashSync(anonymousUser.password, 5);
      const userRole = await this.roleService.findOne({ value: "ADMIN" });
      const user = await this.userService.create({
        email: anonymousUser.email,
        password: hashedPassword,
        poster: anonymousUser.userPoster || "",
        roles: [userRole.value],
      });
      console.log(user);
      return { message: "User has been successfully created" };
    } catch (err) {
      console.log(err);
      return { message: "Registration error" };
    }
  }

  async login(user) {
    try {
      const userRecord = await this.userService.findOne({ email: user.email });

      if (!userRecord) {
        return null;
      }

      const validPassword = bcrypt.compareSync(
        user.password,
        userRecord.password
      );
      if (!validPassword) {
        return null;
      }
      const token = await this._generateAccessToken(
        userRecord._id,
        userRecord.roles,
        userRecord.email,
        userRecord.poster
      );

      console.log("TOKEN", token);
      console.log("You have been successfully signed in");

      return token;
  
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async getUsers() {
    try {
      let users = await this.userService.list({});
      return {users};
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = JWTAuthProvider;
