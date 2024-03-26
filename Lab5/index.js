const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();
const port = 3300;


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "mydb",
});

app.use(bodyParser.urlencoded());
app.use(express.static("public"));

const adminRoutes = require('./roures/admin');
const router = require("./roures/admin");
app.use("/admin", adminRoutes);

app.set("view engine", "ejs");
app.set("views", "./views");


app.get("/", (req, res) => {
  let sqlProducts = `SELECT * FROM products`;
  let sqlCatalogs = `SELECT * FROM categories`;

  connection.query(sqlProducts, (errProducts, products) => {
    if (errProducts) {
      console.error("Error fetching products:", errProducts);
      res.status(500).send("Internal Server Error products");
      return;
    }

    connection.query(sqlCatalogs, (errCatalogs, categories) => {
      if (errCatalogs) {
        console.error("Error fetching catalogs:", errCatalogs);
        res.status(500).send("Internal Server Error catalogs");
        return;
      }

      res.render("home", { categories: categories, products: products });
    });
  });
});

// app.get("/shop/:id", (req, res) => {
//   let cateId = req.params.id;

//   let sql = `SELECT * FROM products WHERE Category_id = ?`;
//   let sqlCatalogs = `SELECT * FROM categories`;

//   connection.query(sql, cateId, function (err, products) {
//     if (err) {
//       console.error("Error fetching data:", err);
//       res.status(500).send("Internal Server Error haha");
//       return;
//     }

//     connection.query(sqlCatalogs, (errCatalogs, categories) => {
//       if (errCatalogs) {
//         console.error("Error fetching catalogs:", errCatalogs);
//         res.status(500).send("Internal Server Error catalogs");
//         return;
//       }

//       // Render template khi đã lấy được cả dữ liệu sản phẩm và danh mục thành công
//       res.render("products", { products: products, categories: categories });
//     });
//   });
// });


app.get("/addnew", (req, res) => {
  res.render("add-product");
});


//  thêm sản phẩm
app.post("/addnew", (req, res) => {
  const file = req.file;
  const name = req.body.productName || "Default Product Name"; 
  const img = "default-image.jpg"; 
  const price = req.body.price || 0; 
  const shortDescription = req.body.description || "No description provided"; 
  const cateId = req.body.categoryId || 1; 

  // Tạo một chuỗi SQL với placeholder
  const sql = `INSERT INTO products (name, short_desciption, img, price, Category_id) 
               VALUES (?, ?, ?, ?, ?)`;

  // Mảng giá trị sẽ thay thế các placeholder trong chuỗi SQL
  const values = [name, shortDescription, img, price, cateId];

  // Thực hiện truy vấn SQL
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting product:", err);
      res.status(500).send("Internal Server Error hihi");
      return;
    }
    console.log("Product added successfully!");
    res.redirect("/");
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
