const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexCotroller")
const filter = require('../controllers/searchController')

router.get("/", indexController.getIndexPage);
// router.get('/', filter.filterItems)

module.exports = router;
