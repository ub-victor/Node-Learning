const express = require ('express');
const router = express.Router();

const data = {};

data.employees = require('../../data/employees.json');

// routers

router.route('/')
    .get((req, res)=>{
        res.json(data.employees);
    })
    .post()
    .put()
    .delete();
    
router.route('/:id')
.get((req, res)=>{
    res.json({ "id": req.params.id})
});


module.exports = router;