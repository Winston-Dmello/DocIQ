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
