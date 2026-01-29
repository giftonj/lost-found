const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

//get the post form
//router.get("");

//new post
router.get("/new", postController.getPostForm);

// // created post
// router.post();

// //edit
// router.put();

// //delete
// router.delete();

module.exports = router;
