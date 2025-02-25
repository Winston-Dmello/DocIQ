const { findUserByEmail } = require("./auth.service");
const generateToken = require("./generateToken");

exports.loginUser = async (req, res, next) => {
  try {
    const userObject = await findUserByEmail(req.body.email);
    console.log(userObject);
    if (userObject) {
      if (userObject.role != "user") {
        res.sendStatus(403);
      } else if (userObject.password === req.body.password) {
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
    if (userObject) {
      if (userObject.role != "admin") {
        res.sendStatus(403);
      } else if (userObject.password === req.body.password) {
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
