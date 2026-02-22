const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')
const authorize = require('../middleware/authentication')

router.get('/', authorize, categoryController.getCategoryPage)
router.get('/new', authorize, categoryController.createNew)
router.post('/new', authorize, categoryController.createCategory)

module.exports = router