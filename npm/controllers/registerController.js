const User = require('../model/User');
const bcrypt = require('bcrypt');

const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data){this.users = data}
}



const handleNewUser = async (req, res)=>{
    const {user, pwd} = req.body;//After this line, user holds req.body.user and pwd holds req.body.pwd.
    if (!user || !pwd) return res.status(400).json({'message': 'Username and Password are required.'});// 

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: user}).exec();
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
        const result = await User.create({
             "username": user,
             "password": hashedPwd
        })

        
        res.status(201).json({'success': `New user ${user} created!` });
    }catch (err){
        res.status(500).json({'message': err.message});
    }

}

module.exports = {handleNewUser};
