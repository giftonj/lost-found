const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')

router.get('/', categoryController.getCategoryPage)
router.get('/new', categoryController.createNew)
router.post('/new', categoryController.createCategory)

module.exports = router