const data = {
    employees: require('../data/employees.json'),
    setEmployees: function(data){this.employees = data }
};

const getAllEmployees = (req, rep)=>{
    res.json(data.employees);
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

//3h34