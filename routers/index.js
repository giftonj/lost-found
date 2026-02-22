const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexCotroller")
const authenticate = require('../middleware/authentication')

router.get("/", authenticate, indexController.getIndexPage);

module.exports = router;
