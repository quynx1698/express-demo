var db = require("../db");
var md5 = require("md5");

module.exports.login = function(req, res) {
  res.render("auth/login");
};

module.exports.postLogin = function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  var user = db
    .get("user")
    .find({ email: email })
    .value();

  if (!user) {
    res.render("auth/login", {
      errors: ["User does not exist."],
      values: req.body
    });
    return;
  }

  if (user.password !== md5(password)) {
    res.render("auth/login", {
      errors: ["Wrong password."],
      values: req.body
    });
    return;
  }

  res.cookie("userId", user.id, {
    signed: true
  });
  res.redirect("/users");
};
