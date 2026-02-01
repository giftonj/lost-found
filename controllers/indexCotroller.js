const Post = require('../models/post')

exports.getIndexPage = async (req, res) => {
  
  try {
    const posts = await Post.find().sort({createdAt: 'desc'}).exec()
    res.render("index", { posts: posts });
  }
  catch (err) {
    res.render('index', { posts: [] })
  }


};
