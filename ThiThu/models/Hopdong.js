const connection = require("./Database.js");

let products = [];
module.exports = class Product {
  constructor() {}

  static getAll(callback) {
    let sql = "SELECT * FROM hop_dong";
    connection.query(sql, function (err, data) {
      if (err) throw err;
      callback(data);
    });
  }

  static getOne(id, callback) {
    let sql = `SELECT * FROM hop_dong where id = ${id}`;
    connection.query(sql, function (err, data) {
      if (err) throw err;
      callback(data);
    });
  }

  static update(id, data, callback) {
    connection.query(`UPDATE hop_dong SET ? WHERE id = ${id}`, data , (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result); // Pass result instead of products
        }
    });
}

  static delete(id, callback) {
    let sql = `DELETE FROM hop_dong WHERE id = ${id}`;
    connection.query(sql, function (err, data) {
      if (err) throw err;
      callback(data);
    });
  }

  static create(newProduct, callback) {
    connection.query("INSERT INTO `hop_dong` SET ?", newProduct, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, newProduct);
        }
    });
}
};
