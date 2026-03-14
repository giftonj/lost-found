const Post = require('../models/post')
const Category = require('../models/category')

exports.getIndexPage = async (req, res) => {
  
  try {
    const categories = await Category.find({})
    const posts = await Post.find({ status: 'active' }).sort({createdAt: 'desc'}).exec()
    res.render("index", { 
      posts: posts,
      categories: categories
    });
  }
  catch (err) {
    console.error(err);
    res.render('index', { posts: [] })
  }


};
