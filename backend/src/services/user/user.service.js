const User = require('../../models/user.model');

exports.getAllUsers = async () => {
  const users = await User.findAll();
  console.log(users);
  return users;
};

exports.addUser = async (userData) => {
  const newUser = { id: users.length + 1, ...userData };
  users.push(newUser);
  return newUser;
};
