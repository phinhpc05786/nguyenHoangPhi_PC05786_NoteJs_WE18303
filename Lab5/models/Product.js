const Product = require("./Database.js");
const connection = require("./Database.js");

module.exports = class Product {
  constructor() {}

  static getAll(callback) {
    let sql = "SELECT * FROM products";
    connection.query(sql, function (err, data) {
      if (err) throw err;
      callback(data)
    });
  }

  // static getAdd(callback) {
  //   res.render("add");
  // }

  static postProduct(callback){
    // app.post("/addnew", upload.single("productImage"), (req, res) => {
    //     const file = req.file;
    //     const name = req.body.productName || "Default Product Name"; 
    //     const img = file ? file.filename : "default-image.jpg"; 
    //     const price = req.body.price || 0; 
    //     const shortDescription = req.body.description || "No description provided"; 
    //     const cateId = req.body.categoryId || 1; 
      
    //     // Tạo một chuỗi SQL với placeholder
    //     const sql = `INSERT INTO products (name, short_desciption, img, price, Category_id) 
    //                  VALUES (?, ?, ?, ?, ?)`;
      
    //     // Mảng giá trị sẽ thay thế các placeholder trong chuỗi SQL
    //     const values = [name, shortDescription, img, price, cateId];
      
    //     // Thực hiện truy vấn SQL
    //     connection.query(sql, values, (err, result) => {
    //       if (err) {
    //         console.error("Error inserting product:", err);
    //         res.status(500).send("Internal Server Error hihi");
    //         return;
    //       }
    //       console.log("Product added successfully!");
    //       res.redirect("/");
    //     });
    //   });
  }
  // static async getAll() {
  //     let sql = "SELECT * FROM products";

  //     return await connection.query(sql);
  //   }
};

 
