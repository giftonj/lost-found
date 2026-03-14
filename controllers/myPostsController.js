const Post = require('../models/post')
const User = require('../models/user')
const Category = require("../models/category")
const Claim = require('../models/claim')
const jwt = require('jsonwebtoken')

exports.viewMyPosts = async (req, res) => {
    try{
        const token = req.cookies.accessToken
        const accessToken = process.env.ACCESS_TOKEN

        const userPayload = jwt.verify(token, accessToken)

        const findUser = await User.findById(userPayload.userId)
        

        const findPosts = await Post.find({
            user: findUser,
            status: 'active'
        })

        res.render("post/myPostView/myPosts", {
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
            post: edit,
            categories: categories
        })
    }
    catch(err) {
        console.error(err);
        res.redirect('myPost/:id')
    }
    
}

exports.updatePost = async (req, res) => {
    const postId = req.params.id
    console.log("PostID: ", postId)

    const fileName = req.file != null ? req.file.filename : null;

    const body = {
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        cover_image: fileName,
        location: req.body.location,
        category: req.body.category
    }

    const edited = await Post.findByIdAndUpdate(postId, ...body, { new: true })

    console.log("Edited: ", edited)

    res.redirect('/myPost')
}

exports.getVerifyPage = async (req, res) => {
    try {
        const postId = req.params.id
        const post = await Post.findById(postId)
        res.render('post/myPostView/verify', {
            post: post
        })
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
}

exports.verifyClaims = async (req, res) => {
    try {
        const postId = req.params.id
        const details = {
            itemId: postId
        }

        const user = await User.findOne({ email: req.body.email})
        if(!user) {
            return res.status(400).json({
                errorMessage: 'User not found!'
            })
        }

        const verify =  new Claim({
            user: user._id,
            ...details
        })


        const newClaim = await verify.save()

        const findPost = await Post.findByIdAndUpdate(postId, { status: 'found' }, { new: true })
        console.log('claim saved successfully')
        res.redirect('/myPost')
    }
    catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
}

