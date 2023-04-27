const adminModel = require("../../model/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.index = (req, res) => {
  logindata = {};
  logindata.email = req.cookies.email ? req.cookies.email : undefined;
  logindata.password = req.cookies.email ? req.cookies.password : undefined;
  res.render("admin/adminPage/index", {
    tittle: "Admin|login",
    displayData: logindata,
    data: req.admin,
  });
};

exports.dashboard = (req, res) => {
  res.render("admin/adminPage/admin-dasboard", {
    tittle: "Admin|Dashboard",
    data: req.admin,
  });
};

exports.register = (req, res) => {
  res.render("admin/adminPage/adminRegister", {
    tittle: "Admin|Register",
    data: req.admin,
  });
};

exports.adminRegister = (req, res) => {
  adminModel({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
  })
    .save()
    .then((result) => {
      console.log("User Added...");
      req.session.message = {
        type: "success",
        message: "admin registered succesfully...",
      };
      res.redirect("admin");
    })
    .catch((err) => {
      res.redirect("/register");
    });
};

exports.login = async (req, res, next) => {
  const admin = await adminModel
    .findOne({ email: req.body.email })
    .then((result) => {
      if (bcrypt.compareSync(req.body.password, result.password)) {
        const token = jwt.sign(
          {
            id: result._id,
            email: result.adminEmail,
          },
          "Rahul-19956@admin",
          { expiresIn: "5h" }
        );
        res.cookie("adminToken", token);
        console.log(token);
        console.log("login succesfull...");
        res.redirect("/dashboard");
      }
    });
};

exports.logout = (req, res) => {
  res.clearCookie("adminToken");
  res.redirect("/admin");
};

exports.adminAuth = (req, res, next) => {
  if (req.admin) {
    console.log(req.admin);
    next();
  } else {
    console.log("error", req.admin);
    res.redirect("/admin");
  }
};
