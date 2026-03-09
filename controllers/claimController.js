const Post = require('../models/post')
const User = require('../models/user')

exports.claimItem = async (req, res) => {
    try {
        const postID = req.params.id

        const findpost = await Post.findById(postID)

        const userId = findpost.user

        const findUser = await User.findById(userId)
        res.render("claimView/claim", {
            owner: findUser
        })
    }
    catch (err) {
        console.error(err)
        res.status(500).send("Server error")
    }

    
}