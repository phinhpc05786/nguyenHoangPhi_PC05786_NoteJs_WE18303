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
  // static async getAll() {
  //     let sql = "SELECT * FROM products";

  //     return await connection.query(sql);
  //   }
};

 
