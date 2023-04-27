const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  department_name: {
    type: String,
    required: true,
  },
  department_Description: {
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

const departmentModel = new mongoose.model("department", departmentSchema);
module.exports = departmentModel;


// deptName
// 	deptDescription
// 	deptMedHealth
// 	deptFeatures