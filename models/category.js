const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
},
{timestamps: true});

module.exports = mongoose.model("Category", categorySchema);
