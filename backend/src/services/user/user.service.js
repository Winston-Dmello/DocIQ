const User = require('../../models/user.model');
const { hashPassword } = require('../../utils/password');

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
    const user = await User.findByPk(user_id);
    if(!user) throw new Error('User not found');
    return user;
  }catch(error){
    throw error;
  }
}

exports.delUser = async (user_id) => {
  try{
    const user = await getUserById(user_id);
    if (!user) throw new Error('User not found');
    if (user.role != "user") throw new Error('Cannot delete admin');

    await user.destroy();
    return {message: "User deleted successfully"};
  }catch(error){
    throw error;
  }
}

