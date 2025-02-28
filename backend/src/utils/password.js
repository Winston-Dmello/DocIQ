const bcrypt = require('bcrypt');

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


module.exports = { hashPassword, checkPassword }