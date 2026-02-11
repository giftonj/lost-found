const Category = require("../models/category");
const Post = require("../models/post");

// exports.getSearchPage = async (req, res) => {
//     const category = await Category.find({})
//     const post = await Post.find({})
//     res.render('searchview/search.ejs', {
//         categories: category,
//     })
// }

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
    // Inputs from the search form
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



    res.status(200).render("searchview/search", {
      posts: results,
      categories: await Category.find({}),

    });
  }
    catch (err) {
        console.error(err)
        res.status(500).send('Server Error or Posts not Found!')
    }
}

// exports.filterItems = async (req, res) => {
    
//     try {
//         const lostPost = await Post.where('type').equals('Lost')
//         const foundPost = await Post.where('type').equals('Found')
//         const allPost = await Post.find({})

//         if (lostPost) {
//             res.redirect('/search/lost')
//         }
//         else if (foundPost) {
//             res.redirect('/search/found')
//         }
//         else if (allPost){
//             res.redirect('/search/all')
//         }
//         else{
//           res.status(404).send('Page not found')
//         }
//     }
//     catch (err) {
//         console.error(err)
//         res.status(500).send('Server Error or Posts not Found!')
//     }
// }

// exports.foundItems = async (req, res) => {
//     try {
//         const choice = req.body.searchType
//         let query = {}

//         if (choice === "Lost" || choice === "Found") {
//             query.type = choice
//         }

//         const posts = Post.find(query)
//         res.render('/views/index.ejs', { posts })
//     }
//     catch (err) {
//         res.status(500).send(err)
//     }
// }

// async function run() {
//   try {
//     const typeOfPost = await Post.find({
//       type: 'Found'
//     })
//     console.log(typeOfPost)
//   }
// catch (err) {
//   console.error(err)
// }
// }
// run()
