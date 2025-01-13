// Dummy data (replace with a database later)
const users = [];

exports.getAllUsers = async () => {
  return users;
};

exports.addUser = async (userData) => {
  const newUser = { id: users.length + 1, ...userData };
  users.push(newUser);
  return newUser;
};
