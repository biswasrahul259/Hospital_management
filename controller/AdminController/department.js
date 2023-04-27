const departmentModel = require("../../model/department");
const doctorModel = require("../../model/doctor");

exports.department = (req, res) => {
  departmentModel.find().exec((err, data) => {
    if (!err) {
      res.render("admin/department/department", {
        data: data,
      });
    } else {
      console.log(err);
    }
  });
};

exports.addDepartment = (req, res) => {
  doctorModel.find().then((data1) => {
    res.render("admin/department/departmentAdd", {
      tittle: "Add department",
      department: data1,
    });
  });
};




exports.postDepatment = (req, res) => {
  const image = req.file;
  departmentModel({
    department_name: req.body.department_name,
    department_Description: req.body.department_Description,
    image: image.path,
  })
    .save()
    .then((result) => {
      req.session.message = {
        type: "success",
        message: "Departmet Added successfully !!",
      };
      res.redirect("/admindepartment");
      console.log(result);
    })
    .catch((error) => {
      console.log("Category Not Added", error);
    });
};

exports.editDepartment = (req, res) => {
  const id = req.params.id;
  departmentModel.findById(id, (err, data) => {
    res.render("admin/department/editDepartment", {
      tittle: "Edit Department",
      department: data,
    });
  });
};

//Update details

exports.updateDepartment = (req, res) => {
  const id = req.params.id;
  const department_name = req.body.department_name;
  const department_Description = req.body.department_Description;
  const image = req.file;
  console.log(id, department_name, department_Description, image);
  departmentModel.findById(id).then((data) => {
    (data.department_name = department_name),
      (data.department_Description = department_Description),
      (data.image = image.path);
    return data
      .save()
      .then((result) => {
        console.log(result);
        req.session.message = {
          type: "success",
          message: "Departmet updated successfully !!",
        };
        res.redirect("/department");
      })
      .catch((err) => {
        req.session.message = {
          type: "danger",
          message: "user not updated",
        };
        res.redirect("/admindepartment");
      });
  });
};

//delete data

exports.delete = (req, res) => {
  departmentModel.findByIdAndDelete({ _id: req.params.id }).then((result) => {
    req.session.message = {
      type: "success",
      message: "Department deleted successfully !!",
    };
    res.redirect("/admindepartment");
  });
};
