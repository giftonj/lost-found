const express = require('express')
const router = express.Router()
const myPost = require('../controllers/myPostsController')

router.get('/', myPost.viewMyPosts)
router.get('/:id', myPost.editMyPost)
router.post('/:id', myPost.updatePost)

module.exports = router