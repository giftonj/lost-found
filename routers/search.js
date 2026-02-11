const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController");

router.get('/', searchController.searchPage)
// router.get("/", searchController.filterItems);

router.post("/", searchController.searchItems); 

module.exports = router;
