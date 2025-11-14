const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res)=> {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401) // 401 = Unauthorized, and this line checks if the cookie named 'jwt' exists in the request cookies
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({refreshToken}).exec();
    if(!foundUser) return res.sendStatus(403); // 403 = Forbidden;
    // evaluate jwt

    // verify the validity of the refresh token, the jwt.verify method takes the token, the secret key, and a callback function as arguments with the purpose of decoding the token and checking its validity
    jwt.verify( 
        refreshToken, // the token to be verified
        process.env.REFRESH_TOKEN_SECRET,  // the secret key used to sign the token
        (err, decoded) => { // callback function that runs after verification
            if(err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles); // get roles array from foundUser.roles object
            const accessToken = jwt.sign( // create new access token
                {"userInfo": {
                    "username": decoded.username,
                    "roles": roles // array of roles
                }}, // payload containing the username and roles
                process.env.ACCESS_TOKEN_SECRET, // secret key for signing the token
                {expiresIn: '30s' }
            );
            res.json({ accessToken }); // send the new access token as a JSON response
        } 
    );

       
}

module.exports = { handleRefreshToken };