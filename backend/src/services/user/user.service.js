const User = require('../../models/user.model');

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
  const newUser = { id: users.length + 1, ...userData };
  users.push(newUser);
  return newUser;
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