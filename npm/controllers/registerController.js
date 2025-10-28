const path = require('path');
const fsPromises = require('fs').promises;
const bcrypt = require('bcrypt');

const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data){this.users = data}
}



const handleNewUser = async (req, res)=>{
    const {user, pwd} = req.body;//After this line, user holds req.body.user and pwd holds req.body.pwd.
    if (!user || !pwd) return res.status(400).json({'message': 'Username and Password are required.'});// 

    // check for duplicate usernames in the db
    const duplicate = usersDB.users.find(person => person.username === user); 
    if (duplicate) return res.sendStatus(409); // Conflict
    try {
        //encrypt the password
        /*
        bcrypt.hash(pwd, 10) — call bcrypt’s hash function:

        pwd — plain-text password to hash.

        10 — salt rounds (cost factor). More rounds = slower but harder to brute force.

        hashedPwd receives resulting hashed string (bcrypt format $2b$10$...).
        */
        const hashedPwd = await bcrypt.hash(pwd, 10); 
        //store the new user
        const newUser = {"username": user, "password": hashedPwd }
        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users, null, 2) // pretty print//This writes the updated users array back to disk at ../model/users.json.
        );

        console.log('Users updated:', usersDB.users);
        res.status(201).json({'success': `New user ${user} created!` });
    }catch (err){
        res.status(500).json({'message': err.message});
    }

}

module.exports = {handleNewUser};