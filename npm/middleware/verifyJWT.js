const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next)=>{
    const authHeader = req.headers.authorization || req.headers.Authorization; // Bearer token
    if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    console.log(authHeader); // Bearer token
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded)=>{
            if(err) return res.sendStatus(403); // Invalid token
            req.user = decoded.username; // the username stored in the token , the token payload contains the username then this line extracts it and assigns it to req.user for use in subsequent middleware or route handlers.
            next();
        }
    )
}


module.exports = verifyJWT;