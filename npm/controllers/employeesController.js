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

const updateEmployee = (req, res)=>{
            res.json({
                "firstname": req.body.firstname,
                "lastname": req.body.lastname
            })
    }

const deleteEmployee = (req, res)=>{
            res.json({"id": req.body.id})
    }

const getEmployee = (req, res)=>{
    res.json({ "id": req.params.id})
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}