const User = require('../../models/user.model');
const { hashPassword } = require('../../utils/auth.utils');

exports.getAllUsers = async () => {
  try{
    const users = await User.findAll();
    console.log(users);
    return users;
  }catch(error){
    throw error;
  }
};

exports.addUser = async (userData) => {
  try{  
      const hashedPassword = await hashPassword(userData.password);
      const user = await User.create({
        user_name: userData.user_name,
        email: userData.email,
        password: hashedPassword,
        designation: userData.designation,
        role: userData.role,
        division: userData.division,
        association: userData.association,
      });
      return user;
  }catch(error){
    throw error;
  }
};

exports.getUserById = async (user_id) => {
  try{
    const user = User.findOne({where: {user_id: user_id}});
    if(!user) throw new Error('User not found');
    return user;
  }catch(error){
    throw error;
  }
}

