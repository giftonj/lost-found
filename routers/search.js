const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController");

//search page
router.get('/', searchController.searchPage)

//search results
router.post("/", searchController.searchItems); 

module.exports = router;
