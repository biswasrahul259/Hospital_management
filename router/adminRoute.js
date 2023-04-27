const router = require("express").Router();
const AdminController = require("../controller/AdminController/adminController");
const verifyAdmin = require("../middleware/adminAuthveryfy");
const serviceController = require("../controller/AdminController/service");
const blogController = require("../controller/AdminController/blog");
const departmentController = require("../controller/AdminController/department");
const doctorController = require("../controller/AdminController/doctor");
const appointmentController = require("../controller/AdminController/appointment");
const contactUsController = require('../controller/AdminController/ContactUs')
const veryfiSignup = require("../middleware/veryfiSignup");
const departmentVerify = require("../middleware/verifyDepartment")

router.get("/admin", AdminController.index);
router.get("/dashboard", AdminController.adminAuth, AdminController.dashboard);
router.get("/register", AdminController.register);
router.post(
  "/register",
  [veryfiSignup.checkDuplicateEntries],
  AdminController.adminRegister
);
router.post("/login", AdminController.login);
router.get("/logout", AdminController.logout);

//services
router.get("/service", AdminController.adminAuth, serviceController.index);
router.get(
  "/addService",
  AdminController.adminAuth,
  serviceController.addService
);
router.post(
  "/addService",
  AdminController.adminAuth,
  serviceController.postService
);
router.get(
  "/editService/:id",
  AdminController.adminAuth,
  serviceController.edit
);
router.post(
  "/updateService/:id",
  AdminController.adminAuth,
  serviceController.update
);
router.get(
  "/deleteservice/:id",
  AdminController.adminAuth,
  serviceController.delete
);

//blogs
router.get("/adminblog", AdminController.adminAuth, blogController.index);
router.get("/blogAdd", AdminController.adminAuth, blogController.addBlog);
router.post("/blogAdd", AdminController.adminAuth, blogController.postBlog);
router.get("/blogEdit/:id", AdminController.adminAuth, blogController.edit);
router.post(
  "/updateBlog/:id",
  AdminController.adminAuth,
  blogController.update
);
router.get("/delete/:id", AdminController.adminAuth, blogController.delete);

//department
router.get(
  "/admindepartment",
  AdminController.adminAuth,
  departmentController.department
);

router.get(
  "/addDepartment",
  AdminController.adminAuth,
  departmentController.addDepartment
);
router.post(
  "/addDepartment",[departmentVerify.checkDuplicateEntries],
  AdminController.adminAuth,
  departmentController.postDepatment
);
router.get(
  "/editDepartment/:id",
  AdminController.adminAuth,
  departmentController.editDepartment
);
router.post(
  "/updateDepartment/:id",
  AdminController.adminAuth,
  departmentController.updateDepartment
);
router.get(
  "/deleteDepartment/:id",
  AdminController.adminAuth,
  departmentController.delete
);

//Doctor
router.get(
  "/adminDoctor",
  AdminController.adminAuth,
  doctorController.showDoctor
);
router.get(
  "/addDoctor",
  AdminController.adminAuth,
  doctorController.addDocotor
);
router.post(
  "/addDoctor",
  AdminController.adminAuth,
  doctorController.postDoctor
);
router.get("/editDoctor/:id", AdminController.adminAuth, doctorController.edit);
router.post(
  "/editDoctor/:id",
  AdminController.adminAuth,
  doctorController.update
);
router.get(
  "/deleteDoctor/:id",
  AdminController.adminAuth,
  doctorController.delete
);

//appointment render
router.get(
  "/adminappointment",
  AdminController.adminAuth,
  appointmentController.Apppointment
);
// router.get(
//   "/showAppointment",
//   AdminController.adminAuth,
//   appointmentController.showAppointment
// );
// router.post(
//   "/createAppointment",
//   AdminController.adminAuth,
//   appointmentController.createAppointment
// );
router.get(
  "/deleteApo/:id",
  AdminController.adminAuth,
  appointmentController.delete
);

router.get('/adminContact', AdminController.adminAuth,contactUsController.ContactUs)
router.post('/addContact',contactUsController.createContact)
router.get('/deleteCont/:id',contactUsController.deleteCont)

module.exports = router;
