const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data){this.users = data}
}

const fsPromises = require ('fs').promises;
const path = require('path');

const handleLogout = (req, res)=> {
    // On client, also delete the access token

    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204) // 204 = No Content, and this line checks if the cookie named 'jwt' exists in the request cookies
    const refreshToken = cookies.jwt; // get refresh token from cookie


    // Is refreshToken in DB?
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);// find user with matching refresh token
    if(!foundUser){

        res.clearCookie('jwt', {httpOnly : true}); // secure: true means the cookie will only be sent over HTTPS
        return res.sendStatus(204);
        
    }
    // Remove refreshToken in DB
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== refreshToken);
    const currentUser = { ...foundUser, refreshToken: ''}; // remove refreshToken from current user
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
        path.join(__dirname,  '..', 'model', 'users.json'),
        JSON.stringify(usersDB.users)
    );
    

    res.clearCookie('jwt', {httpOnly : true}); // secure: true means the cookie will only be sent over HTTPS
    res.sendStatus(204);
       
}

module.exports = { handleLogout };