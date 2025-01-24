const jwt = require('jsonwebtoken');

const generateToken = (email, role) => {
    
    const token = jwt.sign({email, role}, process.env.JWT_SECRET_KEY, {
        expiresIn: '15m',
    });
    return token;
}

module.exports = generateToken;