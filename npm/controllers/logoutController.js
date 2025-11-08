const usersDB = {
  users: require('../model/users.json'),
  setUsers: function (data) { this.users = data; }
};

const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // nothing to do

    const refreshToken = cookies.jwt;

    // Find user with this refresh token
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
      // Clear cookie on client (match options used when setting the cookie)
      res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' });
      return res.sendStatus(204);
    }

    // Remove refreshToken from the found user and persist
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== refreshToken);
    const currentUser = { ...foundUser, refreshToken: '' };
    usersDB.setUsers([...otherUsers, currentUser]);

    // Persist updated users (handle errors)
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(usersDB.users, null, 2) // pretty print for readability
    );

    // Clear cookie on client (options must match set cookie)
    res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' });
    return res.sendStatus(204);
  } catch (err) {
    console.error('Logout error:', err);
    return res.sendStatus(500);
  }
};

module.exports = { handleLogout };

// 5:09