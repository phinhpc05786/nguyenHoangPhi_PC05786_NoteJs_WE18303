const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded());
var jsonParser = bodyParser.json();
// routes

app.get("/", (req, res) => {
  res.send("<p>Đây là trang home!</p>");
});

// app.get("/products", (req, res) => {
//   res.send("<p>Đây là trang products</p>");
// });

app.get("/add-product", (req, res) => {
  res.send(`<p>Đây là trang add</p> 
    <form action="/products" method="POST">
        <input type="text" name="ProductName" placeholder="Product">
        <button type="submit">Add product</button>
    </form> `);
});

const productList = [];

// Câu 3
app.post("/products", (req, res) => {
  productList.unshift(req.body.ProductName);
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const inventors = [
  { id: 1, first: "Albert", last: "Einstein", year: 1879, passed: 1955 },
  { id: 2, first: "Isaac", last: "Newton", year: 1643, passed: 1727 },
  { id: 3, first: "Galileo", last: "Galilei", year: 1564, passed: 1642 },
  { id: 4, first: "Marie", last: "Curie", year: 1867, passed: 1934 },
  { id: 5, first: "Johannes", last: "Kepler", year: 1571, passed: 1630 },
  { id: 6, first: "Nicolaus", last: "Copernicus", year: 1473, passed: 1543 },
];

app.get("/inventors", (req, res) => {
  let list = "<h2>Danh sách nhà khoa học<ul>";
  inventors.forEach((e) => {
    list += `<li><a style="text-decoration:none;color:green;" href="/inventor/${e.id}">${e.last}</a></li>`;
  });
  list += "</ul></h2>";
  res.send(list);
});

app.get("/inventor/:id", (req, res) => {
  let id = req.params.id;
  inventor = inventors.find((e) => e.id == id);
  info = `<h2>Thông tin chi tiết nhà khoa học:Full name: ${inventor.first} ${inventor.last}, Year: ${inventor.year},
              Passed: ${inventor.passed}</h2>`;
  res.send(info);
});

//   Câu 4

app.get("/add-inventor", (req, res) => {
  res.send(`  <div class="container mt-5">
  <form action="/inventor" method="POST">
      <h1 class="text-center mb-4 text-primary">Thêm Nhà Khoa Học</h1>
      <div class="form-row">
          <div class="form-group col-md-6">
              <label for="first">Tên</label>
              <input type="text" class="form-control" name="first" placeholder="Nhập tên" required>
          </div>
          <div class="form-group col-md-6">
              <label for="last">Họ</label>
              <input type="text" class="form-control" name="last" placeholder="Nhập họ" required>
          </div>
      </div>
      <div class="form-row">
          <div class="form-group col-md-6">
              <label for="year">Năm sinh</label>
              <input type="number" class="form-control" name="year" placeholder="Năm sinh" required>
          </div>
          <div class="form-group col-md-6">
              <label for="passed">Năm mất</label>
              <input type="number" class="form-control" name="passed" placeholder="Năm mất">
          </div>
      </div>
      <button type="submit" class="btn btn-success">Thêm Nhà Khoa Học</button>
  </form>
</div>`);
});

app.post("/inventor", (req, res) => {
  let newInventor = req.body;
  newInventor.id = inventors.length + 1;
  inventors.push(newInventor);
  res.redirect("/inventors");
});

// câu 5

const product = [
  { id: 1, name: "gà", price: 40, moTa: "sadad", img: "" },
  { id: 2, name: "vịt", price: 40, moTa: "sadad", img: "" },
  { id: 3, name: "chim", price: 40, moTa: "sadad", img: "" },
  { id: 4, name: "rắn", price: 40, moTa: "sadad", img: "" },
];
app.get("/product", (req, res) => {
  let list = "<h2>Danh sách sản phẩm<ul>";
  product.forEach((e) => {
    list += `<li><a style="text-decoration:none;color:green;" href="/product/${e.id}">${e.name}</a></li>`;
  });
  list += "</ul></h2>";
  res.send(list);
});

app.get("/product/:id", (req, res) => {
  let id = req.params.id;
  let foundProduct = product.find((e) => e.id == id);

  if (foundProduct) {
    let info = `<h2>Thông tin sản phẩm:<br>
                    Full name: ${foundProduct.name}<br> 
                    Price: ${foundProduct.price}<br> 
                    Description: ${foundProduct.moTa}<br> 
                    Image: <img src="${foundProduct.img}"> <br> 
                    <form action="" method="POST">
      <h1 class="text-center mb-4 text-primary">Bình luận</h1>
      <div class="form-row">
          <div class="form-group col-md-6">
              <label for="first">Tên</label>
              <input type="text" class="form-control" name="comment" placeholder="">
          </div>
      <button type="submit" id-data="${foundProduct.id}" class="btn btn-success">Thêm</button>
  </form>
                    `;
    res.send(info);
  } else {
    res.send("<h2>Product not found</h2>");
  }
});


console.log(comments);
app.post("/product/:id", (req, res) => {
    let newInventor = req.body;
    const comments = [{ id: 1, idPro: 1, moTa: "1111" }];
    newInventor.id = comments.length + 1;
    inventors.push(newInventor);
  
    const lastDigit = newInventor.id.toString().slice(-1);
  
    console.log(comments[0].moTa); // Log moTa property của comment đầu tiên
  
    res.redirect(`/product/${lastDigit}`);
  
    let id = req.params.id;
    let foundProduct = product.find((e) => e.id == id);
    let singleComment = comments.find((e) => e.idPro == id); // Sửa đổi để so sánh với idPro của bình luận
  
    if (foundProduct && singleComment) {
      let info = `<h2>Thông tin sản phẩm:<br>
                      Tên: ${foundProduct.name}<br> 
                      Giá: ${foundProduct.price}<br> 
                      Mô tả: ${foundProduct.moTa}<br> 
                      Hình ảnh: <img src="${foundProduct.img}"> <br> 
                      <form action="" method="POST">
                        <h1 class="text-center mb-4 text-primary">Bình luận</h1>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="first">Tên</label>
                                <input type="text" class="form-control" name="comment" placeholder="">
                            </div>
                        </div>
                        <button type="submit" id-data="${foundProduct.id}" class="btn btn-success">Thêm</button>
                    </form>
                    <p>${singleComment.moTa}</p>
                  `;
      res.send(info);
      console.log(comments);
    } else {
      res.send("<h2>Không tìm thấy sản phẩm hoặc bình luận</h2>");
    }
  });
  
  