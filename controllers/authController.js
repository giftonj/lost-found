const { name } = require('ejs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')


exports.getLoginForm = (req, res) => {
    res.render('authview/login', {
        user: {},
        errorMessage: null
    })
}


exports.getSignUpPage = (req, res) => {
    res.render('authview/signup', {
        user: new User()
    })
}

exports.createUser = async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    try {
        const newUser = await user.save()
        res.status(302).redirect('/api/auth')
    }
    catch (err) {
        console.error("Mongoose Save Error", err)
        res.status(500).render('authview/signup', {
            user: user,
            errorMessage: 'Error creating user' + err.message
        })
    }
}

exports.validateUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.render('authview/login', { errorMessage: 'Invalid email or password' })
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.render('authview/login', { errorMessage: 'Invalid email or password' })
        }

        const token = jwt.sign(
            { userId: user._id },
            'SECRET_KEY',
            { expiresIn: '1h' }
        )

        res.cookie('token', token, { httpOnly: true })

        res.status(302).redirect('/')
    }
    catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
}