const departmentModel = require("../../model/department");
const doctorModel = require("../../model/doctor");
const appointModel = require("../../model/Appointment");
const path = require("path");

exports.Apppointment = (req, res) => {
  appointModel
    .find()
    .populate("doctor")
    .populate("department")
    .exec((err, data) => {
      if (!err) {
        console.log(data);
        res.render("admin/appointment/appointment", {
          appointdata: data,
        });
      }
    });
};

exports.showAppointment = (req, res) => {
  doctorModel.find().then((result1) => {
    departmentModel.find().then((result2) => {
      res.render("admin/appointment/addAppontment", {
        data: req.admin,
        displayData1: result1,
        displayData2: result2,
      });
    });
  });
};

exports.createAppointment = (req, res) => {
  appointModel({
    patientName: req.body.patientName,
    patientPhone: req.body.phone,
    bookingDate: req.body.date,
    bookingTime: req.body.time,
    department: req.body.department_name,
    doctor: req.body.name,
  })
    .save()
    .then((result) => {
      console.log(result, "resultData");
      res.redirect("/adminappointment");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.delete = (req, res) => {
  appointModel.findByIdAndDelete({ _id: req.params.id }).then((result) => {
    req.session.message = {
      type: "success",
      message: "apointment deleted successfully !!",
    };
    res.redirect("/adminappointment");
  });
};
