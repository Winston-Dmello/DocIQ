const User = require('../../models/user.model')


exports.findUserByEmail = async (email) => {
    try{
        const check = await User.findOne({where: {email: email}});
        if(check) return check;
    }catch(error){
        console.log("Error occured while fetching user data!");
    }
    return false;
}