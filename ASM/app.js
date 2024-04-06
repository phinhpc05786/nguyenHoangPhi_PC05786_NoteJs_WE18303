const express = require('express');
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const multer = require("multer");
const port = 3300;

const upload = multer({ dest: './public/data/uploads/' })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/data/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = uniqueSuffix + '.' + file.originalname.split('.').pop();
    cb(null, filename);
  }
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use('/admin', express.static('Admin/dist'));
app.use('/client', express.static('Client'));

const adminViewsPath = __dirname + "/Admin/dist/";
const clientViewsPath = __dirname + "/Client/";

app.set("view engine", "ejs");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "nodejs",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database!");
});

app.get("/admin", (req, res) => {
  res.render(adminViewsPath + "index.ejs");
});

app.get("/addProduct", (req, res) => {
  connection.query("SELECT * FROM products", function (err, products) {
    if (err) throw err;
    connection.query("SELECT * FROM categories", function (err, cates) {
      if (err) throw err;
      res.render(adminViewsPath + "addPro.ejs", { products: products, cates: cates });
    });
  });
});

app.get("/editPro/:id", (req, res) => {
  const productId = req.params.id;

  // Lấy thông tin của sản phẩm từ cơ sở dữ liệu
  connection.query("SELECT * FROM products WHERE id = ?", [productId], function (err, product) {
    if (err) {
      console.error("Error fetching product: " + err.stack);
      res.status(500).send("Internal Server Error");
      return;
    }

    if (product.length === 0) {
      res.status(404).send("Product not found");
      return;
    }

    connection.query("SELECT * FROM categories", function (err, cates) {
      if (err) {
        console.error("Error fetching categories: " + err.stack);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.render(adminViewsPath + "editPro.ejs", { product: product[0], cates: cates });
    });
  });
});

app.post("/editPro/:id", upload.single('img'), (req, res) => {
  const productId = req.params.id; 
  const { name, cate, description, price } = req.body;

  if (isNaN(price)) {
    res.render('editPro', { error: "Price must be a valid number", name, cate, description });
    return;
  }

  let img = ""; 

  if (req.file) {
    img = req.file.filename; 
  }

  connection.query(
    "UPDATE products SET name=?, cate=?, description=?, price=?, img=? WHERE id=?",
    [name, cate, description, price, img, productId],
    function (err, result) {
      if (err) {
        console.error("Error editing product: " + err.stack);
        res.status(500).send("Internal Server Error");
        return;
      }
      console.log("Product edited successfully");
      res.redirect("/adminShop");
    }
  );
});

app.get("/adminShop", (req, res) => {
  connection.query("SELECT * FROM products", function (err, products) {
    if (err) {
      console.error("Error querying products: " + err.stack);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.render(adminViewsPath + "products.ejs", { products: products });
  });
});

app.post("/adminShop/delete/:id", (req, res) => {
  const productId = req.params.id;
  connection.query("DELETE FROM products WHERE id = ?", [productId], function (err, result) {
    if (err) {
      console.error("Error deleting product: " + err.stack);
      res.status(500).send("Internal Server Error");
      return;
    }
    console.log("Product deleted successfully");
    res.redirect("/adminShop");
  });
});

app.get("/adminUser", (req, res) => {
  connection.query("SELECT * FROM user", function (err, users) {
    if (err) {
      console.error("Error querying users: " + err.stack);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.render(adminViewsPath + "user.ejs", { users: users });
  });
});

app.get("/addUser", (req, res) => {
  connection.query("SELECT * FROM products", function (err, products) {
    if (err) throw err;
    connection.query("SELECT * FROM categories", function (err, cates) {
      if (err) throw err;
      res.render(adminViewsPath + "addUser.ejs", { products: products, cates: cates });
    });
  });
});

app.get("/adminUser", (req, res) => {
  connection.query("SELECT * FROM user", function (err, users) {
    if (err) {
      console.error("Error querying users: " + err.stack);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.render(adminViewsPath + "user.ejs", { users: users });
  });
});

app.get("/editUser/:id", (req, res) => {
  const userId = req.params.id;

  // Lấy thông tin của người dùng từ cơ sở dữ liệu
  connection.query("SELECT * FROM user WHERE id = ?", [userId], function (err, user) {
    if (err) {
      console.error("Error fetching user: " + err.stack);
      res.status(500).send("Internal Server Error");
      return;
    }

    if (user.length === 0) {
      res.status(404).send("User not found");
      return;
    }

    res.render(adminViewsPath + "editUser.ejs", { user: user[0] });
  });
});

// Thêm tuyến đường POST để xử lý dữ liệu được gửi từ form chỉnh sửa người dùng
app.post("/editUser/:id", upload.single('img'), (req, res) => {
  const userId = req.params.id; 
  const { name, email, phone, description, password, confirm_password } = req.body;

  // Kiểm tra xem mật khẩu và xác nhận mật khẩu có khớp nhau không
  if (password !== confirm_password) {
    res.render('editUser.ejs', { error: "Passwords do not match", name, email, phone, description });
    return;
  }

  let img = ""; 

  if (req.file) {
    img = req.file.filename; 
  }

  connection.query(
    "UPDATE user SET name=?, email=?, phone=?, description=?, img=?, password=? WHERE id=?",
    [name, email, phone, description, img, password, userId],
    function (err, result) {
      if (err) {
        console.error("Error editing user: " + err.stack);
        res.status(500).send("Internal Server Error");
        return;
      }
      console.log("User edited successfully");
      res.redirect("/adminUser");
    }
  );
});



app.post("/addUser", upload.single('img'), (req, res) => {
  const { name, email, password, phone, description } = req.body;

  if (!name || !email || !password) {
    res.status(400).send("Name, email, and password are required");
    return;
  }

  let img = ""; 

  if (req.file) {
    img = req.file.filename; 
  }

  connection.query(
    "INSERT INTO user (name, email, password, phone, description, img) VALUES (?, ?, ?, ?, ?, ?)",
    [name, email, password, phone, description, img],
    function (err, result) {
      if (err) {
        console.error("Error adding user: " + err.stack);
        res.status(500).send("Internal Server Error");
        return;
      }
      console.log("User added successfully");
      res.redirect("/adminUser"); 
    }
  );
});

app.post("/adminUser/delete/:id", (req, res) => {
  const userId = req.params.id;
  connection.query("DELETE FROM `user` WHERE id = ?", [userId], function (err, result) {
    if (err) {
      console.error("Error deleting user: " + err.stack);
      res.status(500).send("Internal Server Error");
      return;
    }
    console.log("User deleted successfully");
    res.redirect("/adminUser");
  });
});

app.get("/adminCate", (req, res) => {
  connection.query("SELECT * FROM categories", function (err, categories) {
    if (err) {
      console.error("Error querying categories: " + err.stack);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.render(adminViewsPath + "cate.ejs", { cates: categories });
  });
});

app.get("/addCate", (req, res) => {
  connection.query("SELECT * FROM products", function (err, products) {
    if (err) throw err;
    connection.query("SELECT * FROM categories", function (err, cates) {
      if (err) throw err;
      res.render(adminViewsPath + "addCate.ejs", { products: products, cates: cates });
    });
  });
});

app.post("/addCate", (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    res.status(400).send("Category name is required");
    return;
  }

  connection.query(
    "INSERT INTO categories (name, description) VALUES (?, ?)",
    [name, description],
    function (err, result) {
      if (err) {
        console.error("Error adding category: " + err.stack);
        res.status(500).send("Internal Server Error");
        return;
      }
      console.log("Category added successfully");
      res.redirect("/adminCate"); 
    }
  );
});

app.get("/formEditCate/:id", (req, res) => {
  const categoryId = req.params.id;

  // Lấy thông tin của danh mục từ cơ sở dữ liệu
  connection.query(`SELECT * FROM categories WHERE id = ${categoryId}`, function (err, category) {
    if (err) {
      console.error("Error fetching category: " + err.stack);
      res.status(500).send("Internal Server Error");
      return;
    }

    if (category.length === 0) {
      res.status(404).send("Category not found");
      return;
    }

    // Render trang chỉnh sửa danh mục và truyền thông tin của danh mục
    res.render(adminViewsPath + "editCate.ejs", { category: category[0] });
  });
});

// Thêm tuyến đường POST để xử lý dữ liệu được gửi từ form chỉnh sửa danh mục
app.post("/formEditCate/:id", (req, res) => {
  const categoryId = req.params.id;
  const { name, description } = req.body;

  // Thực hiện truy vấn SQL để cập nhật thông tin danh mục trong cơ sở dữ liệu
  connection.query(
    "UPDATE categories SET name=?, description=? WHERE id=?",
    [name, description, categoryId],
    function (err, result) {
      if (err) {
        console.error("Error updating category: " + err.stack);
        res.status(500).send("Internal Server Error");
        return;
      }
      console.log("Category updated successfully");
      res.redirect("/adminCate"); // Chuyển hướng sau khi cập nhật thành công
    }
  );
});



app.post("/deleteCate/delete/:id", (req, res) => {
    const cateId = req.params.id; 
    connection.query("DELETE FROM categories WHERE id = ?", [cateId], function (err, result) {
      if (err) {
        console.error("Error deleting category: " + err.stack);
        res.status(500).send("Internal Server Error");
        return;
      }
      console.log("Category deleted successfully");
      res.redirect("/adminCate");
    });
  });

app.get("/loginAdmin", (req, res) => {
  res.render(clientViewsPath + "login.ejs");
});

app.get("/", (req, res) => {
    connection.query("SELECT * FROM products", function (err, products) {
        if (err) throw err;
        connection.query("SELECT * FROM categories", function (err, cates) {
          if (err) throw err;
          res.render(clientViewsPath + "index.ejs", { products: products, cates: cates });
        });
      });
});

app.get("/cart", (req, res) => {
  connection.query("SELECT * FROM categories", function (err, cates) {
    if (err) {
      console.error("Error querying database: " + err.stack);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.render(clientViewsPath + "cart.ejs", { cates: cates });
  });
});

app.get("/chackout", (req, res) => {
  res.render(clientViewsPath + "chackout.ejs");
});

app.get("/shop-detail/:id", (req, res) => {
  const productId = req.params.id;
  connection.query("SELECT * FROM products WHERE id = ?", [productId], function (err, products) {
    if (err) {
      console.error("Error querying database: " + err.stack);
      res.status(500).send("Internal Server Error");
      return;
    }
    if (products.length > 0) {
      res.render(clientViewsPath + "shop-detail.ejs", { product: products[0] });
    } else {
      res.status(404).send("Sản phẩm không tồn tại");
    }
  });
});

app.get("/shop", (req, res) => {
  connection.query("SELECT * FROM products", function (err, products) {
    if (err) throw err;
    connection.query("SELECT * FROM categories", function (err, cates) {
      if (err) throw err;
      res.render(clientViewsPath + "shop.ejs", { products: products, cates: cates });
    });
  });
});

app.get("/register", (req, res) => {
  res.render(clientViewsPath + "register.ejs");
});

app.post('/register', upload.single('img'), (req, res) => {
  const { name, email, phone, description, password, cpassword } = req.body;
  let img = '';
  if (req.file) {
    img = req.file.filename;
  }
  if (password !== cpassword) {
    res.status(400).send("Mật khẩu và xác nhận mật khẩu không khớp.");
    return;
  }
  connection.query("SELECT * FROM user WHERE name = ? OR email = ?", [name, email], function (err, results) {
    if (err) {
      console.error("Error querying database: " + err.stack);
      res.status(500).send("Internal Server Error");
      return;
    }
    if (results.length > 0) {
      res.status(400).send("Tên hoặc email đã tồn tại. Vui lòng chọn tên hoặc email khác.");
      return;
    }
    const newUser = {
      name: name,
      email: email,
      phone: phone,
      description: description,
      img: img,
      password: password
    };
    connection.query("INSERT INTO user SET ?", newUser, function (err, result) {
      if (err) {
        console.error("Error inserting user into database: " + err.stack);
        res.status(500).send("Internal Server Error");
        return;
      }
      console.log("New user added to the database with ID: ", result.insertId);
      res.redirect("/login");
    });
  });
});

app.get("/login", (req, res) => {
  res.render(clientViewsPath + "clientLogin.ejs");
});

app.post('/login', (req, res) => {
  const { name, password } = req.body;
  connection.query("SELECT * FROM user WHERE name = ? AND password = ?", [name, password], function (err, users) {
    if (err) {
      console.error("Error querying database: " + err.stack);
      res.status(500).send("Internal Server Error");
      return;
    }
    if (users.length > 0) {
      connection.query("SELECT * FROM products", function (err, products) {
        if (err) {
          console.error("Error querying products: " + err.stack);
          res.status(500).send("Internal Server Error");
          return;
        }
        connection.query("SELECT * FROM categories", function (err, categories) {
          if (err) {
            console.error("Error querying categories: " + err.stack);
            res.status(500).send("Internal Server Error");
            return;
          }
          res.render(clientViewsPath + "index.ejs", { products: products, cates: categories, user: users[0] });
        });
      });
    } else {
      res.status(401).send("Invalid username or password");
    }
  });
});

app.get('/logout', (req, res) => {
  user = undefined;
  res.redirect('/login');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = connection;
