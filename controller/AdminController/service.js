const ServiceModel = require("../../model/service");

exports.index = (req, res) => {
  ServiceModel.find().exec((err, data) => {
    if (err) {
      res.json({ message: err.message });
    } else {
      res.render("admin/service/servicePage", {
        tittle: "home page",
        data: data,
      });
    }
  });
};


exports.addService = (req, res) => {
  res.render("admin/service/addServices", {
    tittle: "Add Service",
  });
};

exports.postService = (req, res) => {
  const image = req.file;
  const Service = new ServiceModel({
    tittle: req.body.tittle,
    description: req.body.description,
    image: image.path,
  });
  Service.save((err) => {
    if (err) {
      res.json({ message: err.message, type: "danger" });
    } else {
      req.session.message = {
        type: "success",
        message: "Services added successfully",
      };
      res.redirect("/service");
    }
  });
};

//update page

exports.edit = (req, res) => {
  const id = req.params.id;
  ServiceModel.findById(id, (err, data) => {
    res.render("admin/service/editServices", {
      tittle: "Edit Service",
      data: data,
    });
  });
};

//Update details

exports.update = (req, res) => {
  const id = req.params.id;
  const tittle = req.body.tittle;
  const description = req.body.description;
  const image = req.file;
  console.log(id, tittle, description, image);
  ServiceModel.findById(id).then((data) => {
    (data.tittle = tittle),
      (data.description = description),
      (data.image = image.path);
    return data
      .save()
      .then((result) => {
        console.log(result);
        req.session.message = {
          type: "success",
          message: "Services updated successfully !!",
        };
        res.redirect("/service");
      })
      .catch((err) => {
        req.session.message = {
          type: "danger",
          message: "user not updated",
        };
        res.redirect("/admin/editService");
      });
  });
};

//delete data

exports.delete = (req, res) => {
  ServiceModel.findByIdAndDelete({ _id: req.params.id }).then((result) => {
    req.session.message = {
      type: "success",
      message: "Services deleted successfully !!",
    };
    res.redirect("/service");
  });
};
