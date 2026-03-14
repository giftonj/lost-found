function allowedRoles(...roles) {
    return function (req, res, next) {
        if (!req.user) {
            return res.redirect('/')
        }
        if (!roles.includes(req.user.role)) {
            return res.redirect('/index')
        }

        next()
    }
}

module.exports = allowedRoles