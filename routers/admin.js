const express = require("express")
const router = express.Router()
const adminController = require('../controllers/adminController')
router.get('/', adminController.getAdminpage)

module.exports = router