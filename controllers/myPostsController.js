const Post = require('../models/post')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.viewMyPosts = async (req, res) => {
    try{
        const token = req.cookies.accessToken
        const accessToken = process.env.ACCESS_TOKEN

        const userPayload = jwt.verify(token, accessToken)

        const findUser = await User.findById(userPayload.userId)

        const findPosts = await Post.where("user").equals(findUser)

        res.render("myPostView/myPosts", {
            post: findPosts
        })
    }
    catch (err) {
        console.error(err)
        res.status(500).send("Server Error")
    }
    
}