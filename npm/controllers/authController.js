const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data){this.users = data}
}

const bcrypt = require('bcrypt');

const jtw = require('jsonwebtoken')
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
        const accessToken = jtw.sign(
            {"username": foundUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30s' }
        );
        const refreshToken = jtw.sign(
            {"username": foundUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30s' }
        );
        res.json({ 'success': `User ${user} is logged in!`});
    }else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };