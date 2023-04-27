const Router = require('express').Router()
const doctorController = require('../controller/apiController/apiController')

Router.get('/doctors-by-cat/:cat', doctorController.doctorsByCategory);

module.exports = Router;

