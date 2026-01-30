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

app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

const indexRouter = require("./routers/index");
const postRouter = require("./routers/post");
const authRouter = require("./routers/auth");

app.use("/", indexRouter);
app.use("/post", postRouter);
app.use("/api/auth", authRouter);

app.listen(process.env.port || 3000);
