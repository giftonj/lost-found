if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser"); //for accessing the page body
const jwt = require('jsonwebtoken')
const path = require('path')
const cookieParser = require('cookie-parser')
const User = require('./models/user')

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (erorr) => console.error(erorr));
db.once("open", () => console.log("Connected to Mongoose Database"));

app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))
app.use(express.json())
app.use(cookieParser());
require("./crons");


//middleware: verify access token (if present) some views change how they appear views
app.use(async(req, res, next) => {
  const accessToken = req.cookies && req.cookies.accessToken;
  const secret = process.env.ACCESS_TOKEN;

  if (!accessToken || !secret) {
    req.user = null;
    res.locals.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(accessToken, secret);
    const user = await User.findById(decoded.userId)
    req.user = user;
    res.locals.user = user;
  } 
  catch (err) {
    console.log("JWT ERROR:", err.message);
    req.user = null;
    res.locals.user = null;
  }

  next();
});



const indexRouter = require("./routers/index");
const postRouter = require("./routers/post");
const authRouter = require("./routers/auth");
const categoryRouter = require('./routers/category')
const claimRouter = require("./routers/claim")
const myPostRouter = require("./routers/myPost")
const adminRouter = require('./routers/admin')

app.use("/", authRouter);
app.use("/index", indexRouter);
app.use("/post", postRouter);
app.use('/category', categoryRouter)
app.use("/claim", claimRouter)
app.use('/myPost', myPostRouter)
app.use('/admin', adminRouter)

app.listen(process.env.PORT || 3000);
