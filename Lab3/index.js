const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql');
const multer = require("multer");
const app = express();
const port = 3300;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'mysql',
  database: 'mydb'
});

app.use(bodyParser.urlencoded());
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./view");


const listProduct = [
  {
    id: 1,
    title: "Apple Book",
    price: 3000,
    description:
      "A very interesting book about so many even more interesting things!",
    imageURL: "",
  },
  {
    id: 2,
    title: "VFast Book",
    price: 1000,
    description:
      "A very interesting book about so many even more interesting things!",
    imageURL: "",
  }
];


app.get("/", (req, res) => {
  let sql = `SELECT * FROM products`;
  connection.query(sql, function (err, data) {
    if (err) {
      throw err;
    }else {
      console.log(data);
      res.render('home.ejs',{products: data});
    }})
})

app.get("/products", (req, res) => {
  res.render("products.ejs", { products:data });
});



// Định nghĩa route để hiển thị trang thêm sản phẩm
app.get("/addnew", (req, res) => {
  res.render("add-product");
});


// Cấu hình lưu trữ file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix+file.originalname); // Giữ nguyên tên tệp tin gốc
  },
});


// thêm product
// Cấu hình Multer với lưu trữ đã được thiết lập
const upload = multer({ storage: storage });

// Xử lý POST request khi thêm sản phẩm mới
app.post('/addnew', upload.single('productImage'), (req, res) => {
  try {
    // Kiểm tra xem đã có file được upload chưa
    if (!req.file) {
      throw new Error('Không có file được tải lên.');
    }

    // Lấy tên tệp tin hình ảnh
    const imageName = req.file.originalname;

    // Thêm tên tệp tin hình ảnh vào mảng
    listProduct.push({
      imageURL: imageName,
    });

    // Trích xuất dữ liệu từ form
    const { productName, price, description } = req.body;

    // Thêm các thông tin khác vào mảng
    listProduct[listProduct.length - 1].title = productName;
    listProduct[listProduct.length - 1].price = price;
    listProduct[listProduct.length - 1].description = description;

    // Chuyển hướng về trang cửa hàng
    res.redirect('/products');
  } catch (error) {
    // Xử lý lỗi (ví dụ: log lỗi hoặc hiển thị trang lỗi)
    console.error(error);
    res.status(500).send('Lỗi Server Nội bộ');
  }
});

// chi tiết
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = listProduct.find(item => item.id === productId);

  // Render the product detail template with the product data
  res.render('product-detail', { product });
});

// Other routes and middleware...

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});