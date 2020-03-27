require("dotenv").config();

var express = require("express");
var app = express();
var port = 3000;

var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);

var userRoute = require("./routes/user.route");
var authRoute = require("./routes/auth.route");
var productRoute = require("./routes/product.route");
var cartRoute = require("./routes/cart.route");

var authMiddleware = require("./middlewares/auth.middleware");
var sessionMiddleware = require("./middlewares/session.middleware");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("public"));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.get("/", function(req, res) {
  res.render("index", {
    name: "Simon"
  });
});

app.use("/users", authMiddleware.requireAuth, userRoute);
app.use("/auth", authRoute);
app.use("/products", productRoute);
app.use("/cart", cartRoute);

app.listen(port, function() {
  console.log("Server listening on port " + port);
});
