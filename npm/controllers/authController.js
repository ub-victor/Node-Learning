const User = require('../model/User');
const bcrypt = require('bcrypt'); // is a library to help you hash passwords.
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res)=> {
    const {user, pwd} = req.body;
    if(!user || !pwd) return res.status(400).json({'message': 'Username and password are required.'});
    const foundUser = await User.findOne({ username: user}).exec();
    if(!foundUser) return res.sendStatus(401); // Unauthorized
    // evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if(match){
        const roles = Object.values(foundUser.roles); // get roles array from foundUser.roles object
        // Create JWTs
        const accessToken = jwt.sign(
            { "userInfo":{ // payload part of the JWT
                "username": foundUser.username,
                "roles": roles // array of roles
            }
        },
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
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();


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
       // cookie name, cookie value, options
        res.cookie('jwt', refreshToken, {httpOnly : true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000}); 
        // Send accessToken containing username
        res.json({ accessToken}); // send access token as json response look like this { "accessToken": "<token_value>" }
    }else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };