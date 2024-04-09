const express = require("express");
const multer = require("multer");
const ProductController = require("../controller/api/ProductControllers");
const router = express.Router();
const upload = multer({ dest: "./public/data/uploads/" });


router.get("/products", ProductController.getProducts); // lấy bài viết
router.post("/products", upload.single("img"), ProductController.postProducts);
router.get('/products/:id', ProductController.getOneProduct); // lấy 1 bài
router.put('/products/:id',  upload.single("img"),ProductController.updateProduct); // sửa tất cả field
// router.patch('/posts/:id', ProductController.getPosts); // sửa 1 hoặc một vài dữ liệu
router.delete('/products/:id', ProductController.deleteProduct); // xóa

module.exports = router;
