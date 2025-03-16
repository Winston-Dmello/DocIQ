const { findUserByEmail } = require("./auth.service");
const { generateAccessToken, generateRefreshToken } = require("../../utils/auth.utils");
const { checkPassword } = require('../../utils/auth.utils');
const jwt = require('jsonwebtoken');

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

        const accessToken = generateAccessToken(userObject.email, userObject.role);
        const refreshToken = generateRefreshToken(userObject.email, userObject.role);
        res.setHeader('Authorization', `Bearer ${accessToken}`);
        res.cookie('refreshToken', refreshToken, { 
          httpOnly: true,
          path: '/refreshToken',
          secure: true,
          sameSite: 'Strict',
        });
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
        const token = generateAccessToken(userObject.email, userObject.role);
        const refreshToken = generateRefreshToken(userObject.email, userObject.role);
        res.setHeader('Authorization', `Bearer ${token}`);
        res.cookie('refreshToken', refreshToken, { 
          httpOnly: true,
          path: '/',
          secure: true,
          sameSite: 'None',
        });
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


exports.refreshTokenController = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    console.log("Refresh Token: ",refreshToken);
    if (!refreshToken) {
      return res.status(401).json({message: "Unauthorized"});
    } else {
      jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, user) => {
        if (err) {
          return res.status(403).json({message: "Invalid token"});
        } else {
          const accessToken = generateAccessToken(user.email, user.role);
          res.setHeader('Authorization', `Bearer ${accessToken}`);
          res.status(200).json({message: "Access token refreshed"});
        }
      });
    }
  } catch (err) {
    next(err);
  }
}

exports.logoutController = async (req, res, next) => {
  try {
    res.clearCookie('refreshToken');
    res.status(200).json({message: "Logged out successfully"});
  } catch (err) {
    next(err);
  }
}