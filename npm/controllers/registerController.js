const path = require('path');

const usersDB = {
    users: require('../model/user.json'),
    setUsers: function(data){this.users = data}
}

const fsPromises = require('fs').promises;
const path = require('path')
