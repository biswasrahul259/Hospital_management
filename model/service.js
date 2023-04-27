const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
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

const serviceModel = new mongoose.model("service", serviceSchema);
module.exports = serviceModel;
