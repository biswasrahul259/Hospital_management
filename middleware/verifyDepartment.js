const Department=require('../model/department')

exports.checkDuplicateEntries = (req, res, next) => {

    Department.findOne({
        department_name: req.body.department_name
    }).exec((err, dept) => {
        if (err) {
            console.log(err);
            return;
      }
        if (dept) {
            //req.flash("message", "Department Name Already Exists.");
            return res.redirect("/admindepartment");
    }
    next();
        })
}