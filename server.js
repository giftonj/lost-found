const jwt = require('jsonwebtoken')
const path = require('path')

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser"); //for accessing the page body

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (erorr) => console.error(erorr));
db.once("open", () => console.log("Connected to Mongoose Database"));

// Authentication middleware: verify access token (if present) and expose `user` to views
app.use((req, res, next) => {
  const accessToken = req.cookies && req.cookies.accessToken;
  const secret = process.env.ACCESS_TOKEN || process.env.SECRET_KEY;

  if (!accessToken || !secret) {
    res.locals.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(accessToken, secret);
    res.locals.user = decoded;
  } catch (err) {
    res.locals.user = null;
  }

  next();
});

app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
const cookieParser = require('cookie-parser')

app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))
app.use(express.json())
app.use(cookieParser());

const indexRouter = require("./routers/index");
const postRouter = require("./routers/post");
const authRouter = require("./routers/auth");
const categoryRouter = require('./routers/category')
const searchRouter = require('./routers/search')

app.use("/index", indexRouter);
app.use("/post", postRouter);
app.use("/", authRouter);
app.use('/category', categoryRouter)
app.use('/search', searchRouter)

app.listen(process.env.port || 3000);
