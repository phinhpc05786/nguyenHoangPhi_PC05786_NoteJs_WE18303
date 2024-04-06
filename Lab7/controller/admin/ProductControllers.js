const Product = require("../../models/Product");

exports.addProduct = (req, res, next) => {
  Product.getAll(function (products) {
    res.render("admin/product/add", products);
  });
  
};

exports.getProducts = (req, res, next) => {
  console.log("before getProducts");

};

exports.postProduct = (req, res) => {
  let product = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    cate: req.body.cate,
    img: req.body.img
  }

  ProductModel.create(product, function(result){
    res.status(200).json({
      data: result
    })
  })
};
