const express = require('express');
const ejs = require('ejs');
const app = express();

// Thiết lập view engine là EJS
app.set('view engine', 'ejs');

// Định nghĩa đường dẫn cho file EJS
app.get('/', function(req, res) {
    res.render('index', { /* Dữ liệu truyền vào EJS nếu cần */ });
});

// Khởi động server
const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log(`Server running on port ${port}`);
});