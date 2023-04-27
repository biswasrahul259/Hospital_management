const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = Schema({
  name: {
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
  department: {
    type: Schema.Types.ObjectId,
    ref: "department",
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const doctorModel = new mongoose.model("doctor", doctorSchema);
module.exports = doctorModel;
