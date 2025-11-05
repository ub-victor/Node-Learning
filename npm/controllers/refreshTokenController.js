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

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {"username": decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s' }
            );
            res.json({ accessToken });
        }
    );

       
}

module.exports = { handleLogin };