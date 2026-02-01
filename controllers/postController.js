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
  
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    status: req.body.status || 'active',
    cover_image: fileName,
    location: req.body.location
  })

  try {
    const newPost = await post.save()
    console.log("Post saved succesfully")
    res.redirect('/')
  }
  catch (err) {
    console.error(err)
    renderNewPage(res, post, true)
  }
};
