const express = require('express');
const ProductController = require('../controller/admin/ProductControllers');
const router = express.Router();
const multer = require("multer");

const upload = multer({ dest: "./public/data/uploads/" });

router.get('/products', ProductController.getProducts);
router.post('/product', upload.single('image'), ProductController.postProduct);

module.exports = router;
