const express = require("express")
const router = express.Router()
const adminController = require('../controllers/adminController')
const allowRoles = require('../middleware/roles')

router.get('/', allowRoles('admin'), adminController.getAdminpage)
router.get('/claimed', allowRoles('admin'), adminController.claimHistory)
router.get('/users', allowRoles('admin'), adminController.allUsers)
router.get('/delete/:id', adminController.deletePosts)
router.get('/users/:id', adminController.adminRole)

module.exports = router