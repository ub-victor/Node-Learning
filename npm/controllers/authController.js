const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data){this.users = data}
}

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require ('fs').promises;
const path = require('path');

const handleLogin = async (req, res)=> {
    const {user, pwd} = req.body;
    if(!user || !pwd) return res.status(400).json({'message': 'Username and password are required.'});
    const foundUser = usersDB.users.find(person => person.username === user);
    if(!foundUser) return res.sendStatus(401); // Unauthorized
    // evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if(match){
        // Create JWTs
        const accessToken = jwt.sign(
            {"username": foundUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            {"username": foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d' }
        );
        // db room where we save our refresh in db with our current user
        const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
        const currentUser = { ...foundUser, refreshToken};
        usersDB.setUsers([...otherUsers, currentUser])
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        /*
        // Here is the meaning of each part of this line of code
        // 'jwt' is the name of the cookie
        // refreshToken is the value we want to store in the cookie
        // {httpOnly : true, maxAge: 24 * 60 * 60 * 1000} are the options for the cookie
        // httpOnly means the cookie is not accessible via JavaScript
        // maxAge sets the expiration time of the cookie
        */
        res.cookie('jwt', refreshToken, {httpOnly : true, maxAge: 24 * 60 * 60 * 1000}); 
        // Send accessToken containing username
        res.json({ accessToken});
    }else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };