const { name } = require("ejs");
const mongoose = require("mongoose");
const coverImageBasePath = "uploads/postCovers";

const postSchema = new mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Lost", "Found"],
      required: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    location: {
      type: String,
      required: false,
    },
    cover_image: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["active", "found"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Post", postSchema);
module.exports.coverImageBasePath = coverImageBasePath;
