const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexCotroller");

router.get("/", indexController.getIndexPage);

module.exports = router;
