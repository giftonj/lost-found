const Post = require("../models/post");
const multer = require("multer");
const path = require("path");
const uploadPath = path.join("public", Post.coverImageBasePath);
const immageMimeTypes = ["images/jpeg", "images/png", "images/gif"];
const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, immageMimeTypes.includes(file.mimetype));
  },
});

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

exports.submitForm = (req, res) => {};
