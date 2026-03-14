const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')
const allowRoles = require('../middleware/roles')

router.get('/', allowRoles('admin'), categoryController.getCategoryPage)
router.get('/new', allowRoles('admin'), categoryController.createNew)
router.post('/new', allowRoles('admin'), categoryController.createCategory)

module.exports = router