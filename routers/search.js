const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController");
const authorize = require('../middleware/authentication')

//search page
router.get('/', authorize,searchController.searchPage)

//search results
router.post("/", authorize, searchController.searchItems); 

module.exports = router;
