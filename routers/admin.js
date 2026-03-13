const express = require("express")
const router = express.Router()
const adminController = require('../controllers/adminController')
router.get('/', adminController.getAdminpage)
router.get('/claimed', adminController.claimHistory)
router.get('/users', adminController.allUsers)

module.exports = router