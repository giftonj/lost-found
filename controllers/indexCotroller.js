const Post = require('../models/post')
const Category = require('../models/category')

exports.getIndexPage = async (req, res) => {
  
  try {
    const categories = await Category.find({})
    const posts = await Post.find().sort({createdAt: 'desc'}).exec()
    res.render("index", { 
      posts: posts,
      categories: categories
    });
  }
  catch (err) {
    res.render('index', { posts: [] })
  }


};
