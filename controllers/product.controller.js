var db = require("../db");

module.exports.showProductList = function(req, res, next) {
  var products = db.get("product").value();

  var page = parseInt(req.query.page) || 1;
  var perPage = 8;

  var start = (page - 1) * perPage;
  var end = page * perPage;

  var drop = (page - 1) * perPage;

  res.render("products/index", {
    //products: products.slice(start, end)
    products: db
      .get("product")
      .drop(drop)
      .take(perPage)
      .value()
  });
};
