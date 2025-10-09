const data = {};

data.employees = require('../../data/employees.json');

const getAllEmployees = (req, rep)=>{
    resizeBy.json(data.employees);
}

const createNewEmployee = (req, res) => {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        });
    }