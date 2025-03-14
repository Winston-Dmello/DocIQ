
const hasRole = (req, res, next) => {
    const roles = ["user", "admin"];
    if (!roles.includes(req.user.role)){
        return res.status(403).json({message: 'Access Denied'});
    }
    next();
}

module.exports = hasRole;