const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexCotroller")
const filter = require('../controllers/searchController')
const authenticate = require('../middleware/authentication')

router.get("/", authenticate, indexController.getIndexPage);
// router.get('/', filter.filterItems)

module.exports = router;
