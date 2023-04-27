const doctorModel = require("../../model/doctor");
const departmentModel = require("../../model/department");


exports.showDoctor = (req, res) => {
  doctorModel
    .find()
    .populate("department")
    .exec((err, data) => {
      if (!err) {
        res.render("admin/doctor/doctor", {
          data: data,
        });
      } else {
        console.log(err);
      }
    });
};

exports.addDocotor = (req, res) => {
  departmentModel.find().then((data) => {
      res.render("admin/doctor/addDoctor", {
        tittle: "Add Service",
        doctor: data,
      });
    });
};

exports.postDoctor = (req, res) => {
  console.log(req.body);
  const image = req.file;
  doctorModel({
    name: req.body.name,
    description: req.body.description,
    department: req.body.department_name,
    image: image.path, 
  })
    .save()
    .then((data) => {
      console.log(data);
      res.redirect("/adminDoctor");
    });
};

//update page
exports.edit = (req, res) => {
  const id = req.params.id;
  doctorModel.findById(id, (err, data) => {
    res.render("admin/doctor/editDoctor", {
      tittle: "Edit editDoctor",
      data: data,
    });
  });
};

//Update details
exports.update = (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const department = req.body.department;
  const description = req.body.description;
  const image = req.file;
  doctorModel.findById(id).then((data) => {
    (data.name = name),
      (data.department = department),
      (data.description = description),
      (data.image = image.path);
    return data
      .save()
      .then((result) => {
        console.log(result);
        req.session.message = {
          type: "success",
          message: "doctor updated successfully !!",
        };
        res.redirect("/doctor");
      })
      .catch((err) => {
        req.session.message = {
          type: "danger",
          message: "user not updated",
        };
        res.redirect("/editDoctor");
      });
  });
};

//delete data
exports.delete = (req, res) => {
  doctorModel.findByIdAndDelete({ _id: req.params.id }).then((result) => {
    req.session.message = {
      type: "success",
      message: "Doctor deleted successfully !!",
    };
    res.redirect("/adminDoctor");
  });
};
