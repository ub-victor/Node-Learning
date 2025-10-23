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

    // check for duplicate usernames in the db
    const duplicate = usersDB.users.find(person => person.username === user); 
    if (duplicate) return res.sendStatus(409); // Conflict
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10); 
        //store the new user


    }catch (err){
        res.status(500).json({'message': err.message});
    }

}
//3h53