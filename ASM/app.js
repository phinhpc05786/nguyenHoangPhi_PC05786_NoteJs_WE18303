const express = require('express');
const app = express();

// Cấu hình middleware để phục vụ các tệp tĩnh từ thư mục 'public'
app.use(express.static('public', {
    // Thiết lập kiểu MIME cho các tệp CSS thành 'text/css'
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

app.use(express.static('public', {
    // Thiết lập kiểu MIME cho các tệp JavaScript thành 'text/javascript'
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'text/javascript');
        }
    }
}));



// const express = require("express");
const bodyParser = require("body-parser");

const multer = require("multer");
const port = 3300;
const uploads = multer({ dest: './public/data/uploads/' })

app.use(bodyParser.urlencoded());

//Nếu muốn sử dụng file tĩnh như css, img, js trong thư mục public thì chỉ cần /thumuc/file.css không cần thêm chữ admin
app.use(express.static("public"));

//Nếu muốn sử dụng file tĩnh như css, img, js trong thư mục assets của admin thì thêm admin trước assets
//Thay dì <link href="assets/css/style.bundle.css" rel="stylesheet" type="text/css" /> thì mình thêm chữ admin/assets giống ở dưới
//Ví dụ:  <link href="admin/assets/css/style.bundle.css" rel="stylesheet" type="text/css" />
app.use('/admin', express.static('Admin/dist'));
app.use('/client', express.static('Client'));
//Mỗi lần sửa file này phải chạy lại dự án

// Cấu hình thư mục views cho phần client
const clientViewsPath = __dirname + "/Client/";

// Cấu hình thư mục views cho phần admin
const adminViewsPath = __dirname + "/Admin/dist/";

app.set("view engine", "ejs");




const listProduct = [
    {
        id: 1,
        cate: 3,
        title: "Apple Book",
        price: 3000,
        description: "A very interesting book about so many even more interesting things!",
        img: "fruite-item-5.jpg",
    },
    {
        id: 2,
        cate: 4,
        title: "VFast Book",
        price: 1000,
        description: "A very interesting book about so many even more interesting things!",
        img: "fruite-item-5.jpg",
    }
];

const listUser = [
    {
        id: 1,
        name: "Phi",
        email: "AppleBook.email",
        password: "123",
        phone: 3000,
        description: "A very interesting book about so many even more interesting things!",
        img: "",
    },
    {
        id: 2,
        name: "Phảo",
        email: "AppleBook.email",
        password: "123",
        phone: 3000,
        description: "A very interesting book about so many even more interesting things!",
        img: "",
    }
];

const listCate = [
    {
        id: 1,
        name: "Màu cam",
        description: "A very interesting book about so many even more interesting things!"
    },
    {
        id: 2,
        name: "Màu đỏ",
        description: "A very interesting book about so many even more interesting things!"
    }
];

// Routes cho phần admin
app.get("/admin", (req, res) => {
    res.render(adminViewsPath + "index.ejs");
});
app.get("/adminShop", (req, res) => {
    res.render(adminViewsPath + "products.ejs", { products: listProduct });
});
app.get("/adminUser", (req, res) => {
    res.render(adminViewsPath + "user.ejs", { users: listUser});
});
app.get("/adminCate", (req, res) => {
    res.render(adminViewsPath + "cate.ejs", { cates: listCate});
});
app.get("/loginAdmin", (req, res) => {
    res.render(clientViewsPath + "login.ejs");
});

// Routes cho phần client
app.get("/", (req, res) => {
    res.render(clientViewsPath + "index.ejs", { products: listProduct, cates: listCate });
});

app.get("/cart", (req, res) => {
    res.render(clientViewsPath + "cart.ejs", { cates: listCate });
});

app.get("/chackout", (req, res) => {
    res.render(clientViewsPath + "chackout.ejs");
});

app.get("/shop-detail/:id", (req, res) => {
    // Lấy giá trị của id từ đường dẫn
    const productId = req.params.id;

    // Tìm sản phẩm trong danh sách sản phẩm dựa trên productId
    const product = listProduct.find(product => product.id === parseInt(productId));

    if (product) {
        // Nếu sản phẩm tồn tại, render trang chi tiết sản phẩm và truyền thông tin sản phẩm vào template
        res.render(clientViewsPath + "shop-detail.ejs", { product: product, cates: listCate });
    } else {
        // Nếu không tìm thấy sản phẩm, có thể hiển thị trang 404 hoặc thông báo lỗi khác
        res.status(404).send("Sản phẩm không tồn tại");
    }
});

app.get("/shop", (req, res) => {
    res.render(clientViewsPath + "shop.ejs", { products: listProduct, cates: listCate });
});

app.get("/login", (req, res) => {
    res.render(clientViewsPath + "clientLogin.ejs");
});
app.post('/', (req, res) => {
    // Lấy dữ liệu từ body của yêu cầu
    const { name, password } = req.body;

    console.log(name, password);

    // Kiểm tra thông tin đăng nhập
    const user = listUser.find(user => user.name === name && user.password === password);
    if (user) {
        // Nếu đăng nhập thành công, gửi thông tin người dùng về phía client để lưu vào local storage
        // Render trang clientLogin.ejs với dữ liệu người dùng được truyền vào
        res.render(clientViewsPath + "index.ejs", { products: listProduct, cates: listCate, user: user });
    } else {
        res.status(401).send("Invalid username or password");
    }
});
app.get('/logout', (req, res) => {
    user = undefined; 
    res.redirect('/login'); // Chuyển hướng đến trang đăng nhập
});

app.get("/register", (req, res) => {
    res.render(clientViewsPath + "register.ejs");
});
app.post('/register', (req, res) => {
    // Lấy dữ liệu từ body của yêu cầu
    const { name, email, phone, description, img,password } = req.body;
  
    // Tạo một đối tượng người dùng mới
    const newUser = { 
      id: listUser.length + 1,
      password,
      name,
      email,
      phone,
      description,
      img
    };
  
    // Thêm người dùng mới vào mảng listUser
    listUser.push(newUser);
  
    // Gửi phản hồi về cho người dùng
    res.render(clientViewsPath + "clientLogin.ejs");
  });
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});