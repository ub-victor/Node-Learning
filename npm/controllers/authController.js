const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data){this.users = data}
}

const bcrypt = require('bcrypt')

const handleLogin = async (req, res)=> {
    const {user, pwd} = req.body;
    if(!user || !pwd) return res.status(400).json({'message': 'Username and password ares required.'});
    const foundUser = usersDB.users.find(person => person.username === user);
    // evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if(match){
        // Create JWTs
        res.json({ 'success': `User ${user} is logged in!`});
    }else {
        res.sendStatus(401);
    }
}

