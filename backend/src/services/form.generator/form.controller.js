
const createForm = (req, res, next) => {
    if (req.user.role != "admin"){
        res.status(403).json({message: "Forbidden route"});
    }
    res.status(200).json({message: "Creating a form"});
}

module.exports = {createForm};