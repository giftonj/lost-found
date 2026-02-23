const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

exports.getLoginForm = (req, res) => {
  res.render("authview/login", {
    user: null,
    errorMessage: null,
  });
};

exports.getSignUpPage = (req, res) => {
  res.render("authview/signup", {
    user: null,
  });
};

exports.createUser = async (req, res) => {
  const hashedPassword = await bcryptjs.hash(req.body.password, 10)
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const newUser = await user.save();
    res.status(302).redirect("/auth");
  } catch (err) {
    console.error("Mongoose Save Error", err);
    res.status(500).render("authview/signup", {
      user: user,
      errorMessage: "Error creating user" + err.message,
    });
  }
};

exports.validateUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");//the .select is used to get the password because if you querry without it the password will not be displayed
    if (!user) {
      return res.render("authview/login", {
        errorMessage: "Invalid email or password",
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.render("authview/login", {
        errorMessage: "Invalid email or password",
      });
    }

  const accessToken = generateAccessToken({ userId: user._id });

  const refreshTokenSecret = process.env.SECRET_KEY;
  const refreshToken = jwt.sign({ userId: user._id }, refreshTokenSecret, { expiresIn: "7d" });


  res.cookie("accessToken", accessToken, { httpOnly: true });
  res.cookie("refreshToken", refreshToken, { httpOnly: true });

  res.status(302).redirect("/index");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

function generateAccessToken(userId) {
  return jwt.sign(userId, process.env.ACCESS_TOKEN, {expiresIn: '10m'})
}

exports.logOutUser = async (req, res) => {
  try {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.clearCookie('token');

    return res.redirect('/');
  } catch (err) {
    console.error('Logout error', err);
    return res.status(500).send('Server Error');
  }
} 

