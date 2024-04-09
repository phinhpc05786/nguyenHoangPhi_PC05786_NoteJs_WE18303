const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3300;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());



const apiRoutes = require('./roures/api');
app.use('/api', apiRoutes);

const clientRoutes = require('./roures/client');
app.use('/', clientRoutes);

app.set("view engine", "ejs");
app.set("views", "./views");



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
