const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const Post = require('../models/post')
const multer = require("multer");
const path = require("path");
const uploadPath = path.join("public", Post.coverImageBasePath);
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/avif"];
const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype));
  },
});
const authorize = require('../middleware/authentication')

router.get("/new", authorize, postController.getPostForm);
router.post('/new', authorize, upload.single('cover-image'), postController.createPost);


module.exports = router;
