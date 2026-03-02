const Category = require("../models/category");
const Post = require("../models/post");



exports.searchPage = async (req, res) => {


  try {
    const categories = await Category.find({});
    res.status(200).render("searchview/search", {
      posts: null,
      categories: categories,
      // searchOptions: req.query,
    });
  } catch (err) {
    console.error(err);
    res.status(404).send("Page not found");
  }
};

exports.searchItems = async (req, res) => {
  try {
    const searchQuery = req.body.query
    const searchCategoryId = req.body.category

  // Pagination and sorting options
    const limit = parseInt(req.body.limit) || 10; // default limit 10
    const sortField = req.body.sortField || "createdAt"; // default sort field
    const sortOrder = req.body.sortOrder === "asc" ? 1 : -1; // default descending

 

    
    // Build MongoDB query
    const query = {
      $or: [
        { title: { $regex: searchQuery, $options: "i" } },
        // { description: { $regex: searchQuery, $options: "i" } }, // optional
      ],
    };

    // Only add category filter if one is selected (not "All")
    if (searchCategoryId) {
      query.category = searchCategoryId; // assumes Post has a `category` field storing the category ID
    }

  // Fetch posts
    const results = await Post.find(query)
      .limit(limit)
      .sort({ [sortField]: sortOrder });



    res.status(200).render("index", {
      posts: results,
      categories: await Category.find({}),

    });
  }
    catch (err) {
        console.error(err)
        res.status(500).send('Server Error or Posts not Found!')
    }
}
