const { getAllUsers, addUser } = require('./user.service');

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

exports.delUserController = async (req, res, next) => {
  try{
    const user_id = req.params.id;
    const response = await delUser(user_id);   
    return res.json(response);
  } catch(err) {
    next(err);
  }
}