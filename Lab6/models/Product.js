const connection = require("./Database.js");

let products = [];
module.exports = class Product {
  constructor() {}

  static getAll(callback) {
    let sql = "SELECT * FROM products";
    connection.query(sql, function (err, data) {
      if (err) throw err;
      callback(data);
    });
  }

  static getOne(id, callback) {
    let sql = `SELECT * FROM products where id = ${id}`;
    connection.query(sql, function (err, data) {
      if (err) throw err;
      callback(data);
    });
  }

  static update(id, data, callback) {
    connection.query(`UPDATE products SET ? WHERE id = ${id}`, data , (err, result) => {
      if (err) {
          callback(err, null);
      } else {
          callback(data, products);
      }
  });
  }

  static delete(id, callback) {
    let sql = `DELETE FROM products WHERE id = ${id}`;
    connection.query(sql, function (err, data) {
      if (err) throw err;
      callback(data);
    });
  }

  static create(newProduct, callback) {
    connection.query("INSERT INTO products SET ?", newProduct, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, newProduct);
        }
    });
}
};
