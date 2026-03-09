const express = require('express')
const router = express.Router()
const claimController = require('../controllers/claimController')

router.get('/:id', claimController.claimItem)

module.exports = router