const express = require('express')
const router = express.Router()
const myPost = require('../controllers/myPostsController')

router.get('/', myPost.viewMyPosts)

module.exports = router