class AuthJWTController {
  constructor(jwtAuthProvider) {
    this.jwtAuthProvider = jwtAuthProvider
  }
  async registrationJWT(req, res) {
    const anonymousUser = {
      email: req.body.email,
      password: req.body.password,
      poster: req.file?.poster,
    };
    const result = await this.jwtAuthProvider.registration(anonymousUser);
    return res.json(result);
  }

  async loginJWT(req, res) {
    const user = { email: req.body.email, password: req.body.password };
    const token = await this.jwtAuthProvider.login(user);
    if(token) {
      res.cookie("token", token, { httpOnly: true });
      return res.json({token: token});
    }
    return res.json({message:'Something went wrong during authorization'});
  }

  async getUsers(req,res) {
    const users = await this.jwtAuthProvider.getUsers(req, res);
    return res.json({users})
  }

  logOut(req, res) {
    res.clearCookie("token"); // logout if JWT token
    req.logout((err) => {
      // logout if Google Auth
      if (err) return err;
    });
    return res.redirect("/");
  }
}

module.exports = AuthJWTController;
