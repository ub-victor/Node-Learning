const express = require ('express');
const router = express.Router();

const data = {};

data.employees = require('../../data/employees.json');
const getEmployeesController = require('../../controllers/employeesController')

// routers

router.route('/')
    .get()
    .post()
    .put()
    .delete();
    
router.route('/:id')
.get();


module.exports = router;