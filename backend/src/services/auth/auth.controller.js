const { findUserByEmail } = require('./auth.service');

exports.loginUser = async (req, res, next) => {
  try {
    const check = await findUserByEmail(req.body.email);
    if(check){
        if(check.password === req.body.password){
            res.sendStatus(200);
        }else{
            res.status(401);
        }
    }else{
        res.status(404);
    }
  } catch (err) {
    next(err); // Pass errors to the error handler
  }
};