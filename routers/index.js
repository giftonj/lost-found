const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexCotroller")
const authorize = require('../middleware/authentication')

router.get("/", authorize, indexController.getIndexPage);

module.exports = router;
