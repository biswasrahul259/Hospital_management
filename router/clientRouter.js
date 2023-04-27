const Router = require('express').Router()
const Controller = require("../controller/Client/clientController")


Router.get('/',Controller.index)
Router.get('/about',Controller.about)
Router.get('/contact',Controller.contact)
Router.get('/blog',Controller.blog)
Router.get('/services',Controller.Services)
Router.get('/department', Controller.department)
Router.get("/clintSingledepartment",Controller.singleDepartment);
Router.get("/clintSingledepartmentf/:id",Controller.singleDepartmentFatch);
Router.get('/doctor',Controller.doctor)
Router.get('/confirmAppointment',Controller.confirmAppointment)

//appoinment routes
Router.get('/appoinment',Controller.appointment)
Router.post('/appoinmentCreate',Controller.createAppointment)

module.exports = Router;