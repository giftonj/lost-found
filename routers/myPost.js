const express = require('express')
const router = express.Router()
const myPost = require('../controllers/myPostsController')

router.get('/', myPost.viewMyPosts)
router.get('/edit/:id', myPost.editMyPost)
router.post('/edit/:id', myPost.updatePost)
router.get('/verify/:id', myPost.getVerifyPage)
router.post('/verify/:id', myPost.verifyClaims)

module.exports = router