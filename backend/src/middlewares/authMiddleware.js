const jwt = require('jsonwebtoken');

const authMiddleWare = (req, res, next) => {

    const authorizationHeader = req.headers['authorization'] || req.headers['Authorization'];

    if (!authorizationHeader) {
        return res.status(401).json({ message: "Authorization header is missing" });
    }

    if (!authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Invalid token format" });
    }

    const extractedToken = authorizationHeader.split(" ")[1];
    const secretKey = process.env.JWT_SECRET_KEY;

    try{
        const decoded = jwt.verify(extractedToken, secretKey);
        req.user = decoded; //email and name -- req.user.email
        console.log(decoded);
        next();
    }catch(error){
        console.log("Error occured: ", "JsonWebTokenError: invalid token");
        return res.status(403).json({message: "Couldn't verify token"});
    }
}

module.exports = authMiddleWare;