const adminModel = require("../model/admin");

exports.checkDuplicateEntries = (req, res, next) => {
    adminModel.findOne({
        name: req.body.name
    }).exec((err, user) => {
        if (err) {
            console.log(err);
            return;
        }
        if (user) {
            req.session.message = {
                type: "success",
                message: "admin already registered",
              };
            return res.redirect("/register");
            // console.log("Username Already Exists");
            // return;
        }
        adminModel.findOne({
            email: req.body.email
        }).exec((err, email) => {
            if (err) {
                console.log(err);
                return;
            }
            if (email) {
                req.session.message = {
                    type: "success",
                    message: "admin already registered",
                  };
                return res.redirect("/register");

                // console.log("Email already exist...");
                // return;
            }
            const password = req.body.password;
            const confirm = req.body.confirmpassword;
            if (password !== confirm) {
                // req.flash("message", "Password & Confirm Password Are Not Matched");
                // req.flash("alert", "alert-danger");
                return res.redirect("/register");
            }
            next();
            // next();

        })
    })
}