const express = require('express');
const PageController = require('../controller/client/PageController');
const router = express.Router();

router.get("/", PageController.homePage)


module.exports = router;
