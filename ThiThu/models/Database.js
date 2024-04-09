const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "thithu",
});

connection.connect(function(err){
    if (err) throw err;
    console.log("Có kết nối data");
})
module.exports = connection;

