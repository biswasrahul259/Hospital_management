const DoctorModel = require('../../model/doctor')
const DepartmentModel = require('../../model/department')

exports.doctorsByCategory = (req, res) => {
    const doctorCategory = req.params.cat

    DepartmentModel.findOne({ department_name: doctorCategory }).exec(
      (err, department) => {
        if (err) {
          res.status(500).json({ error: error });
        }

        if (!department) {
          res.status(404).json({ message: "Department not found" });
        } else {
          DoctorModel.find({ department: department._id })
            .populate("department")
            .exec((err, doctors) => {
              if (err) {
                res.status(500).json({ error: error });
              }

              res.status(200).json({doctors: doctors});
            });
        }
      }
    );
}
