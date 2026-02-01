const Post = require("../models/post");


async function renderNewPage(res, post, hasError = false) {
  try {
    const post = new Post();
    const params = {
      post: post,
    };
    if (hasError) params.errorMessage = "Error creating Post";
    res.render("post/new", params);
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
}

exports.getPostForm = (req, res) => {
  renderNewPage(res, new Post());
};

exports.createPost = async (req, res) => {
  // Get the uploaded file name if file exists, otherwise null
  const fileName = req.file != null ? req.file.filename : null
  
  // Create new Post object with form data
  const post = new Post({
    title: req.body.title, // FIXED: Changed from req.body.name to req.body.title to match form field
    description: req.body.description,
    type: req.body.type,
    status: req.body.status || 'active',
    cover_image: fileName, // Can be null since we made it optional in the model
    location: req.body.location
  })

  try {
    // Save post to database
    const newPost = await post.save()
    console.log("Post saved succesfully", newPost)
    // FIXED: Removed res.status(201).json(newPost) - can't send both JSON and redirect
    res.redirect('/') // Redirect to home page after successful save
  }
  catch (err) {
    console.error(err)
    renderNewPage(res, post, true)
  }
};
