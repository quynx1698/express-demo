var express = require("express");
var app = express();
var port = 3000;

var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

var userRoute = require("./routes/user.route");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.get("/", function(req, res) {
  res.render("index", {
    name: "Simon"
  });
});

app.use("/users", userRoute);

app.listen(port, function() {
  console.log("Server listening on port " + port);
});
