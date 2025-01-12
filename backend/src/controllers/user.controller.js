const { getAllUsers, addUser } = require('../services/user.service');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    next(err); // Pass errors to the error handler
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const newUser = await addUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};
