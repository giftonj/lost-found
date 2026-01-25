if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

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

const indexRouter = require("./routers/index");

app.use("/", indexRouter);

app.listen(process.env.port || 3000);
