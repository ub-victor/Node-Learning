const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data){this.users = data}
}

const bcrypt = require('bcrypt')

const handleLogin = async (req, res)=> {
    const {user, pwd} = req.body;
}