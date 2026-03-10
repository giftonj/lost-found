const Post = require('../models/post')
const User = require('../models/user')
const Category = require("../models/category")
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

exports.editMyPost = async (req, res) => {
    try {
        const postId = req.params.id
        const edit = await Post.findById(postId)
        const categories = await Category.find({})

        console.log("edit: ", edit)
        res.render("post/edit", {
            post: new Post(edit),
            categories: categories
        })
    }
    catch(err) {
        res.redirect('myPost/:id')
    }
    
}

exports.updatePost = async (req, res) => {
    const postId = req.params.id
    console.log("PsotID: ", postId)

    const edited = await Post.findByIdAndUpdate(postId, req.body, { new: true })

    console.log("Edited: ", edited)

    res.redirect('/myPost')
}
