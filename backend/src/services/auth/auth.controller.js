const { findUserByEmail, findUserByResetToken } = require("./auth.service");
const { generateAccessToken, generateRefreshToken } = require("../../utils/auth.utils");
const { checkPassword, hashPassword } = require('../../utils/auth.utils');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const transporter = require('../../utils/mail.transporter');

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
          maxAge: 24 * 60 * 60 * 1000,
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
          maxAge: 24 * 60 * 60 * 1000,
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
    const refreshToken = await req.cookies.refreshToken;
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

exports.forgotPasswordController = async (req, res, next) => {
  try{
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).send('No user with that email');
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
    console.log(resetLink);
    const mailOptions = {
      from: 'postnanda200@gmail.com',
      to: user.email,
      subject: 'Password Reset Request',
      html: `
        <h2>Hello!</h2>
        <p>You requested to reset your password. </p>
        <p>And so, here we are.</p>
        <p>Click <a href="${resetLink}">here</a> to reset it.</p>
        <p>This link expires in one hour.</p>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending reset email:', error);
        res.status(500).send('Error sending email.');
      } else {
        console.log('Reset email sent:', info.response);
        res.send('Password reset email sent!');
      }
    });
    
  } catch (err) {
    next(err);
  }
}

exports.resetPasswordController = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const user = await findUserByResetToken(token);

    if (!user || user.resetPasswordExpires < Date.now()) {
      return res.status(400).send('Invalid or expired token');
    }

    user.password = await hashPassword(newPassword);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    
    res.send('Password has been reset successfully!');
  } catch (err) {
    next(err);
  }
}
