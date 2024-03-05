const express = require('express');
const app = express();

// routes

app.get("/", (rep, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})