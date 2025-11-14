const User = require('../model/User');

const handleLogout = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // nothing to do

    const refreshToken = cookies.jwt;

    // Find user with this refresh token
    const foundUser = await User.findOne({refreshToken}).exec();
    if (!foundUser) {
      // Clear cookie on client (match options used when setting the cookie)
      res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' });
      return res.sendStatus(204);
    }

    // Remove refreshToken from the found user and persist
    

    // Clear cookie on client (options must match set cookie)
    res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' });
    return res.sendStatus(204);
  } catch (err) {
    console.error('Logout error:', err);
    return res.sendStatus(500);
  }
};

module.exports = { handleLogout };
