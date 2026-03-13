const Post = require('../models/post')
const Category = require('../models/category')


exports.getAdminpage = async (req, res) => {
    try{
        const findPosts = await Post.find()
        console.log("POSTS", findPosts)
        res.status(200).render('admin/index', {
            posts: findPosts
        })
    }
    catch (err) {
        console.error(err)
        res.status(403).send("Anauthorized")
    }
}

exports.claimHistory = async (req, res) => {
    const findPosts = await Post.find({ status: 'found' })
    res.render('admin/claimedPosts', {
        posts: findPosts
    })
}