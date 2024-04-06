const Product = require("../../models/Product");

// exports.addProduct = (req, res, next) => {
//   res.render("admin/product/add");
// };

exports.getProducts = (req, res, next) => {
  Product.getAll(function (products) {
    res.status(200).json({
      messages: "Product list",
      data: products,
    });
  });
};

exports.deleteProduct = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(404).json({
      messages: "Invalid id",
      data: [],
    });
  }
  Product.delete(id, function (data) {
    res.status(200).json({
      messages: "Delete Product",
      data: products,
    });
  });
};

exports.postProducts = (req, res, next) => {
  let products = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    cate: req.body.cate,
    img: req.body.img,
  };
  Product.create(products, function (result) {
    res.status(201).json({
      data: result,
    });
  });
};

exports.getOneProduct = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(404).json({
      messages: "Invalid id",
      data: [],
    });
  }
  Product.getOne(id, function (result) {
    res.status(201).json({
      messages: "Invalid id",
      data: result,
    });
  });
};

exports.updateProduct = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(404).json({
      messages: "Invalid id",
      data: [],
    });
  }

  let product = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    cate: req.body.cate,
    img: req.body.img,
  };

  // if(req.body.name !== null && typeof(req.body.name)){
  //   product.name = req.body.name ? req.body.name : null;
  // }

  Product.update(id, product, function (result) {
    res.status(200).json({
      messages: "Invalid id",
      data: result,
    });
  });
};

// npx webpack -w
