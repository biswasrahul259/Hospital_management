const blogModel = require("../../model/blog");

exports.index = (req, res) => {
  blogModel.find().exec((err, data) => {
    if (err) {
      res.json({ message: err.message });
    } else {
      res.render("admin/blogs/blogPage", {
        tittle: "blog page",
        data: data,
      });
    }
  });
};

exports.addBlog = (req, res) => {
  res.render("admin/blogs/blogAdd", {
    tittle: "Add Blog",
  });
};

exports.postBlog = (req, res) => {
  const image = req.file;
  const blog = new blogModel({
    tittle: req.body.tittle,
    description: req.body.description,
    image: image.path,
  });
  blog.save((err) => {
    if (err) {
      res.json({ message: err.message, type: "danger" });
    } else {
      req.session.message = {
        type: "success",
        message: "blog added successfully",
      };
      res.redirect("/adminblog");
    }
  });
};

//update page

exports.edit = (req, res) => {
  const id = req.params.id;
  blogModel.findById(id, (err, data) => {
    res.render("admin/blogs/blogEdit", {
      tittle: "Edit Blog",
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
  blogModel.findById(id).then((data) => {
    (data.tittle = tittle),
      (data.description = description),
      (data.image = image.path);
    return data
      .save()
      .then((result) => {
        console.log(result);
        req.session.message = {
          type: "success",
          message: "Blog updated successfully !!",
        };
        res.redirect("/adminblog");
      })
      .catch((err) => {
        req.session.message = {
          type: "danger",
          message: "blog not updated",
        };
        res.redirect("/admin/blogEdit");
      });
  });
};

//delete data

exports.delete = (req, res) => {
  blogModel.findByIdAndDelete({ _id: req.params.id }).then((result) => {
    req.session.message = {
      type: "success",
      message: "blog deleted successfully !!",
    };
    res.redirect("/adminblog");
  });
};
