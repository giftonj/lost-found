const jwt = require('jsonwebtoken')

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

// Authentication Middlware
app.use((req, res, next) => {
  const cookieToken = req.headers.cookie;
  // Get the 'token' cookiue from cookieToken
  // JWT token verification logic would go here
  // jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
  //   if (err) {
  //     req.user = null;
  //   } else {
  //     req.user = user;
  //   }
  // });

  // If true, set req.user
  // req.user = { id: 'userId', name: 'username' };
  // else redirect to login or set req.user = null
  next()
})

app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

const indexRouter = require("./routers/index");
const postRouter = require("./routers/post");
const authRouter = require("./routers/auth");
const categoryRouter = require('./routers/category')

app.use("/", indexRouter);
app.use("/post", postRouter);
app.use("/api/auth", authRouter);
app.use('/category', categoryRouter)

app.listen(process.env.port || 3000);
