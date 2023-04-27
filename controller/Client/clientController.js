const serviceModel = require("../../model/service");
const BlogModel = require("../../model/blog");
const departmentModel = require("../../model/department");
const doctorModel = require("../../model/doctor");
const appointModel = require("../../model/Appointment");

exports.index = (req, res) => {
  res.render("Client/index");
};

exports.about = (req, res) => {
  res.render("Client/about");
};

exports.contact = (req, res) => {
  res.render("Client/contact");
};

exports.blog = (req, res) => {
  BlogModel.find((err, data) => {
    if (!err) {
      res.render("Client/blog", {
        blogData: data,
      });
    }
  });
};

exports.Services = (req, res) => {
  serviceModel.find((err, data) => {
    if (!err) {
      res.render("Client/services", {
        displayData: data,
      });
    }
  });
};

exports.department = (req, res) => {
  departmentModel.find((err, data) => {
    if (!err) {
      res.render("Client/department", {
        departmentData: data,
      });
    }
  });
};

exports.singleDepartment = (req, res) => {
  res.render("Client/singleDepartment", {
  });
};

exports.singleDepartmentFatch = (req,res) =>{
  departmentModel.findById({_id:req.params.id}).then((result)=>{
    res.render("Client/singleDepartment",{
      singleDepartment:result
    })
  })
}


//all doctor
exports.doctor = (req, res) => {
  departmentModel.find().then((result)=>{
    doctorModel
    .find()
    .populate("department")
    .exec((err, data) => {
      if (!err) {
        res.render("Client/doctor", {
          doctorData: data,
          department:result
        });
      } else {
        console.log(err);
      }
    });
  })
};


//clint Appointment
exports.confirmAppointment = (req, res) => {
  res.render("Client/confirmationApoint");
};

exports.appointment = (req, res) => {
  doctorModel.find().then((result1) => {
    departmentModel.find().then((result2) => {
      res.render("Client/appointment", {
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
    message: req.body.message,
    department: req.body.department_name,
    doctor: req.body.name,
  })
    .save()
    .then((result) => {
      console.log(result, "resultData");
      res.redirect("/confirmAppointment");
    })
    .catch((err) => {
      console.log(err);
    });
};
