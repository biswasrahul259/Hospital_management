const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
//   isAdmin: {
//     type: Boolean,
//     default: false,
//   },
});

const adminModel = mongoose.model("admin", adminSchema);

module.exports = adminModel;
