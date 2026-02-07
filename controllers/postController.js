const Post = require("../models/post");
const Category = require('../models/category')


async function renderNewPage(res, post, hasError = false) {
  try {
    const categories = await Category.find({})
    const post = new Post();
    const params = {
      post: post,
      categories: categories
    };
    if (hasError) params.errorMessage = "Error creating Post";
    res.render("post/new", params);
  } catch (err) {
    console.error(err);
    res.status(302).redirect("/");
  }
}

exports.getPostForm = (req, res) => {
  renderNewPage(res, new Post());
};

exports.createPost = async (req, res) => {
  // Run authentication middleware first
  // const token = res.cookies.get("token")
  // JWT verification
  // If true, proceed to create post
  // You will have the user id via token payload
// const user = req.user;
  // Get the uploaded file name if file exists, otherwise null
  const fileName = req.file != null ? req.file.filename : null
  
  const post = new Post({

    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    status: req.body.status || 'active',
    cover_image: fileName,
    location: req.body.location,
    category: req.body.category
  })

  try {
    const newPost = await post.save()
    console.log("Post saved succesfully")
    res.status(302).redirect('/')
  }
  catch (err) {
    console.error(err)
    renderNewPage(res, post, true)
  }
};
