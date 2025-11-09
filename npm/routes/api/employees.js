const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRole = require('../../middleware/verifyRole');

router.route('/')
    .get(employeesController.getAllEmployees)
    .post(verifyRole(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.createNewEmployee)
    .put(verifyRole(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee);

router.route('/:id')
    .get(employeesController.getEmployee);

module.exports = router;