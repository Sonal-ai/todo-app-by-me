const jwt = require('jsonwebtoken');
const secret = 'user@123'

function setUser(user){
    const payload = {
        id : user._id,
        email : user.email,
        role: user.role
    }
    return jwt.sign(payload,secret)
}

function getUser(token){
    if (!token){
        return null
    }
    try {
        return jwt.verify(token , secret)
    } catch (error) {
        console.log(error)
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}