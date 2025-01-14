const { findUserByEmail } = require("./auth.service");

exports.loginUser = async (req, res, next) => {
  try {
    const userObject = await findUserByEmail(req.body.email);
    if (userObject) {
      if (userObject.role != "user") {
        res.sendStatus(403);
      } else if (userObject.password === req.body.password) {
        res.sendStatus(200);
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
