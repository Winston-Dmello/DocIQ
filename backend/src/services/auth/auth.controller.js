const { findUserByEmail } = require("./auth.service");
const { generateToken } = require("../../utils/auth.utils");
const { checkPassword } = require('../../utils/auth.utils');

exports.loginUser = async (req, res, next) => {
  try {
    const userObject = await findUserByEmail(req.body.email);
    const password = req.body.password;
    const check = await checkPassword(password, userObject.password);
    console.log(check);
    console.log(userObject);
    if (userObject) {
      if (userObject.role != "user") {
        res.sendStatus(403);
      } else if (check) {
        const token = generateToken(userObject.email, userObject.role);
        res.setHeader('Authorization', `Bearer ${token}`);
        res.status(200).json({message: "Success", user: userObject});
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err); // Pass errors to the error handler
  }
};

exports.loginAdmin = async (req, res, next) => {
  try {
    const userObject = await findUserByEmail(req.body.email);
    const password = req.body.password;
    const check = await checkPassword(password, userObject.password);
    if (userObject) {
      if (userObject.role != "admin") {
        res.sendStatus(403);
      } else if (check) {
        const token = generateToken(userObject.email, userObject.role);
        res.setHeader('Authorization', `Bearer ${token}`);
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};
