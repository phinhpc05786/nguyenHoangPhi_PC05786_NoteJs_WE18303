const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded());
var jsonParser = bodyParser.json();
// routes

app.get("/", (req, res) => {
    res.send("<p>Đây là trang home!</p>");
});

app.get("/products", (req, res) => {
    res.send("<p>Đây là trang products</p>");
});

app.get("/add-product", (req, res) => {
    res.send(`<p>Đây là trang add</p> 
    <form action="/products" method="POST">
        <input type="text" name="ProductName" placeholder="Product">
        <button type="submit">Add product</button>
    </form> `);
});

const productList = [];

app.post("/products", (req, res) => {
    productList.unshift(req.body.ProductName);
    res.send(req.body)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})