const Product = require("../../models/Product");

exports.getProducts = async (req, res, next) => {
  const products = await Product.findAll({
    attributes: ["name"],
  });
  res.status(200).json({
    data: products,
  });

  res.send(products);
};

exports.getOneProduct = async (req, res, next) => {
  const id = parseInt(req.params.id);
  console.log(id);
  if (isNaN(id)) {
    return res.status(404).json({
      messages: "Invalid id",
      data: [],
    });
  }
  const product = await Product.findByPk(id, {attributes: ["name"]} );
  res.status(200).json({
    massages: "success",
    data: product,
  });
};

exports.postProducts = async (req, res, next) => {
  try {
    const { name, price, description, cate, img } = req.body;
    
    // Validate inputs
    if (!name || !price || !description || !cate || !img) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    
    // Create product
    const product = await Product.create({
      name,
      price,
      description,
      cate,
      img,
    });
    
    res.status(201).json({
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    next(error);
  }
};

// exports.postProducts = (req, res, next) => {
//   let products = {
//     name: req.body.name,
//     price: req.body.price,
//     description: req.body.description,
//     cate: req.body.cate,
//     img: req.body.img,
//   };
//   Product.create(products, function (result) {
//     res.status(201).json({
//       data: result,
//     });
//   });
// };

// exports.deleteProduct = (req, res, next) => {
//   const id = parseInt(req.params.id);
//   if (isNaN(id)) {
//     return res.status(404).json({
//       messages: "Invalid id",
//       data: [],
//     });
//   }
//   Product.delete(id, function (data) {
//     res.status(200).json({
//       messages: "Delete Product",
//       data: products,
//     });
//   });
// };



// exports.updateProduct = (req, res, next) => {
//   const id = parseInt(req.params.id);
//   if (isNaN(id)) {
//     return res.status(404).json({
//       messages: "Invalid id",
//       data: [],
//     });
//   }

//   let product = {
//     name: req.body.name,
//     price: req.body.price,
//     description: req.body.description,
//     cate: req.body.cate,
//     img: req.body.img,
//   };

//   // if(req.body.name !== null && typeof(req.body.name)){
//   //   product.name = req.body.name ? req.body.name : null;
//   // }

//   Product.update(id, product, function (result) {
//     res.status(200).json({
//       messages: "Invalid id",
//       data: result,
//     });
//   });
// };

// npx webpack -w
