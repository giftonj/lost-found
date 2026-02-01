const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const Post = require('../models/post')
const multer = require("multer");
const path = require("path");
const uploadPath = path.join("public", Post.coverImageBasePath);
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];
const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype));
  },
});

//get the post form
//router.get("");

//new post
router.get("/new", postController.getPostForm);

// // created post
router.post('/new', upload.single('cover-image'), postController.createPost);

// //edit
// router.put();

// //delete
// router.delete();

module.exports = router;
