const Category = require('../models/category')

exports.getCategoryPage = async (req, res) => {
    const categories = await Category.find({})
    res.status(200).render('admin/categoryview/index.ejs', {
        categories: categories
    })
}

exports.createNew = (req, res) => {
    res.render('admin/categoryview/new.ejs', {
        category: new Category()
    })
}

exports.createCategory = async (req, res) => {
    const category = new Category({
        name: req.body.name
    })

    try {
        const newCategory = await category.save()
        res.status(302).redirect('/category')
    }
    catch (err) {
        console.error(err)
        res.status(302).redirect('/category/new')
    }
    
}