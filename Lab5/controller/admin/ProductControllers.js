const Product = require("../../models/Product");

exports.addProduct = (req, res, next) => {
  res.render("admin/product/add");
};

exports.getProducts = (req, res, next) => {
      Product.getAll(function (products) {
        res.send(products);
    });
  
};

// exports.postProducts = (req, res, next) => {
//   Product.getAdd();
//   };

