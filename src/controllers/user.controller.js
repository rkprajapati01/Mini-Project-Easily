import UserModel from "../models/user.model.js";

export default class UserController {
  register(req, res) {
    const { name, email, password } = req.body;
    UserModel.add(name, email, password);
    res.render("welcome", { userEmail: req.session.userEmail });
  }

  login(req, res) {
    const { email, password } = req.body;
    const user = UserModel.isValid(email, password);
    if (!user) {
      res.render("404", { errorMessage: "Register first to login ", userEmail: req.session.userEmail });
    } else {
      req.session.userEmail = email;
      res.redirect("/jobs");
    }

  }

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        // Redirect to welcome page after logout
        res.redirect('/');
      }
    });
  }
}
