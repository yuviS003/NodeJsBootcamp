const userDB = {
    users: require('../model/user.json'),
    setUsers: function (data) { this.users = data }
}
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) => {
    // On client, also delete the access token

    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) // No content
    const refreshToken = cookies.jwt;


    // Is refresh token in DB?
    const foundUser = userDB.users.find(person => person.refreshToken === refreshToken)
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
        return res.sendStatus(204)
    }
    // Delete the Refresh Token in DB
    const otherUsers = userDB.users.filter(person => person.refreshToken !== foundUser.refreshToken)
    const currentUser = { ...foundUser, refreshToken: '' };
    userDB.setUsers([...otherUsers, currentUser])
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'user.json'),
        JSON.stringify(userDB.users)
    )

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }) // secure: true - only serves on https
    res.sendStatus(204);
}

module.exports = { handleLogout }