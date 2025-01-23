const jwt = require('jsonwebtoken');

const generateToken = (email, name) => {
    
    const token = jwt.sign({email, name}, process.env.JWT_SECRET_KEY, {
        expiresIn: '15m',
    });
    return token;
}

module.exports = generateToken;