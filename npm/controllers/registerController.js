const path = require('path');

const usersDB = {
    users: require('../model/user.json'),
    setUsers: function(data){this.users = data}
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');


const handleNewUser = async (req, res)=>{
    const {user, pwd} = req.body;
    if (!user || !pwd) return res.status(400).status({'message': 'Username and Password are required.'});

}
