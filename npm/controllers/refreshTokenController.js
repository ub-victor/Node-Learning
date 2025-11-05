const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data){this.users = data}
}


const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = (req, res)=> {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(401) // 401 = Unauthorized, and this line checks if the cookie named 'jwt' exists in the request cookies
    console.log(cookies.jwt); 
    const refreshToken = cookies.jwt;

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if(!foundUser) return res.sendStatus(403); // 403 = Forbidden;
    // evaluate jwt
    
    if(match){
        // Create JWTs
        const accessToken = jwt.sign(
            {"username": foundUser.username},
            // Creates a token (using the user’s name + secret key).
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
        // here it is set to 24 hours (24 hours * 60 minutes * 60 seconds * 1000 milliseconds) = 86400000 milliseconds
        // with purpose of enhancing security by preventing XSS attacks
        // XSS (Cross-Site Scripting) attacks occur when an attacker injects malicious scripts into content from otherwise trusted websites
        // By using httpOnly cookies, we help mitigate the risk of client-side scripts accessing the token
        // we not sending the refresh token in the response body but storing it in an httpOnly cookie
        // it can be seen in postman under the cookies section after login

        */
        res.cookie('jwt', refreshToken, {httpOnly : true, maxAge: 24 * 60 * 60 * 1000}); 
        // Send accessToken containing username
        res.json({ accessToken}); // send access token as json response look like this { "accessToken": "<token_value>" }
    }else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };