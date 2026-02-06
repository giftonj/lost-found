const category = require('../models/category')
const Category = require('../models/category')

exports.getCategoryPage = async (req, res) => {
    const categories = await Category.find({})
    res.status(200).render('categoryview/index.ejs', {
        categories: categories
    })
}

exports.createNew = (req, res) => {
    res.render('categoryview/new.ejs', {
        category: new Category()
    })
}

exports.createCategory = async (req, res) => {
    const category = new Category({
        name: req.body.name
    })

    try {
        const newCategory = await category.save()
        res.redirect('/category')
    }
    catch (err) {
        console.error(err)
        res.status(500).redirect('/category/new')
    }
    
}