const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  tittle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  }, 
});

const blogModel = new mongoose.model("blog",blogSchema);
module.exports = blogModel;
