const User = require('../../models/user.model')


exports.findUserByEmail = async (email) => {
    const check = await User.findOne({where: {email: email}});
    if(check) return true;  
    return false;
}