const express = require ('express');
const router = express.Router();

const data = {};

data.employees = require('../../data/employees.json');
const employeesController = require('../../controllers/employeesController')

// routers

router.route('/')
    .get(employeesController.getAllEmployees)
    .post(employeesController.createNewEmployee)
    .put()
    .delete();
    
router.route('/:id')
.get();


module.exports = router;