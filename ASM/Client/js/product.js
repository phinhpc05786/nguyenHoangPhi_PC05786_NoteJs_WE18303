const express = require("express");
const bodyParser = require("body-parser");

const multer = require("multer");
const app = express();
const port = 3300;
const uploads = multer({ dest: './public/data/uploads/'})

app.use(bodyParser.urlencoded());
app.use(express.static("public"));
// var jsonParser = bodyParser.json();
// routes
app.set("view engine", "ejs");
app.set("views", "./view");


const listProduct = [
  {
    id: 1,
    title: "Apple Book",
    price: 3000,
    description:
      "A very interesting book about so many even more interesting things!",
    imageURL: "",
  },
  {
    id: 2,
    title: "VFast Book",
    price: 1000,
    description:
      "A very interesting book about so many even more interesting things!",
    imageURL: "",
  }
];


app.get("/", (req, res) => {
  res.render("");
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });