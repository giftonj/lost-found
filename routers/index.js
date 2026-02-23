const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexCotroller")
const authorize = require('../middleware/authentication')
const searchController = require("../controllers/searchController");

router.get("/", authorize, indexController.getIndexPage);
router.post("/", authorize, searchController.searchItems); 

module.exports = router;
