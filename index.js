var express = require("express");
var app = express();

var bodyParser = require("body-parser");

var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var adapter = new FileSync("db.json");
var db = low(adapter);

var shortid = require("shortid");

// Set some defaults
db.defaults({ user: [] }).write();

var port = 3000;

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", function(req, res) {
  res.render("index", {
    name: "Simon"
  });
});

app.get("/users", function(req, res) {
  res.render("users/index", {
    users: db.get("user").value()
  });
});

app.get("/users/search", function(req, res) {
  var q = req.query.q;
  var matchedUsers = db
    .get("user")
    .value()
    .filter(function(user) {
      return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

  res.render("users/index", {
    users: matchedUsers,
    query: q
  });
});

app.get("/users/create", function(req, res) {
  res.render("users/create");
});

app.get("/users/:id", function(req, res) {
  var id = req.params.id;

  var user = db
    .get("user")
    .find({ id: id })
    .value();

  res.render("users/view", {
    user: user
  });
});

app.post("/users/create", function(req, res) {
  req.body.id = shortid.generate();
  db.get("user")
    .push(req.body)
    .write();
  res.redirect("/users");
});

app.listen(port, function() {
  console.log("Server listening on port " + port);
});
