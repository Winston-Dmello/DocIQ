const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPassword = async (plainPassword) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(plainPassword, salt);
        return hashedPassword;
    }catch(error){
        throw error;
    }
}

const checkPassword = async (inputPassword, hash) => {
    try{
        const match = await bcrypt.compare(inputPassword, hash);
        return match;
    }catch(error){

    }
}

const generateToken = (email, role) => {
    
    const token = jwt.sign({email, role}, process.env.JWT_SECRET_KEY, {
        expiresIn: '15m',
    });
    return token;
}



module.exports = { hashPassword, checkPassword, generateToken }