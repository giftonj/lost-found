const Post = require('../models/post')
const User = require('../models/user')
const Claim = require('../models/claim')


exports.getAdminpage = async (req, res) => {
    try{
        const findPosts = await Post.find({ status: 'active' })
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

exports.allUsers = async (req, res) => {
    const findUsers = await User.find()
    for(const user of findUsers) {
        const findPosts = await Post.find({ user: user._id })
        user.findPosts = findPosts
    }
    for(const user of findUsers) {
        const findClaimed = await Claim.find({ user: user._id })
        user.findClaimed = findClaimed
    }
    res.render('admin/allUsers', {
        users: findUsers
    })
}

exports.deletePosts = async (req, res) => {
    const postId = req.params.id
    const deletePost = await Post.findByIdAndDelete(postId)
    res.redirect('/admin')
}

exports.adminRole = async (req, res) => {
    try {
        const userId = req.params.id
        const changeRole = await User.findByIdAndUpdate(userId)
        if (changeRole.role === 'admin') {
            changeRole.role = 'user'
            await changeRole.save()
        }
        else {
            changeRole.role = 'admin'
            await changeRole.save()
        }
    }
    catch (err) {
        console.error(err)
    }
    
    res.redirect('/admin/users')
}

exports.userDetailsInClaimedHistory = async (req, res) => {
    const postId = req.params.id

    const findClaimedPost = await Post.findById(postId)
    const poster = findClaimedPost.user


    const findClaim = await Claim.findOne({ itemId: findClaimedPost })
    const claimer = findClaim.user

    const findPoster = await User.findById(poster)
    const findClaimer = await User.findById(claimer)

    

    res.render('admin/usersDetails', {
        poster: findPoster,
        claimer: findClaimer
    })
}