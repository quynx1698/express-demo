var db = require("../db");

module.exports.showProductList = function(req, res, next) {
  var products = db.get("product").value();
  res.render("products/index", {
    products: products
  });
};
