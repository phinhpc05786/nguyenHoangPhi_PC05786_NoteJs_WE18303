// const bodyParser = require("body-parser");
const mysql = require("mysql");
// const multer = require("multer");
// const app = express();
// const port = 3300;
// const upload = multer({ dest: "uploads/" });

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "mydb",
});

connection.connect(function(err){
    if (err) throw err;
    console.log("Có kết nối data");
})
module.exports = connection;

// module.exports = class Product{
//     constructor(){

//     }
//     static saveProduct(){

//     }

//     static fetchAll(){
//         let sql = 'SELECT * FROM products'
//         connection.query(sql, function (err, data){
//             if(err) throw err;
//             products=data;
//         });
//         return products;
//     }
// }