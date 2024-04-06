const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const mysql = require("mysql");

const app = express();
const port = 3300;

const upload = multer({ dest: './public/data/uploads/' });

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "nodejs",
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Kết nối đến cơ sở dữ liệu thành công!");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "../dist");

// Thay thế listProduct bằng dữ liệu được lấy từ cơ sở dữ liệu
app.get("/", (req, res) => {
  connection.query("SELECT * FROM products", function(err, products) {
    if (err) {
      console.error("Lỗi truy vấn sản phẩm: " + err.stack);
      res.status(500).send("Lỗi máy chủ nội bộ");
      return;
    }
    res.render("index", { products: products });
  });
});

app.post('/upload', upload.single('image'), (req, res) => {
  // Xử lý tải tệp ở đây
});

app.listen(port, () => {
  console.log(`Máy chủ đang chạy tại http://localhost:${port}`);
});
