const {insertFormIntoDB} = require('./form.service');

const createForm = async (req, res, next) => {
    // if (req.user.role != "admin"){
    //     res.status(403).json({message: "Forbidden route"});
    // }
    try{
        const form = req.body;
        const response = await insertFormIntoDB(form); //returns the created form
        return res.status(200).json({message: "form created successfully", form: response});
    }catch(error){
        next(error);
    }
}

module.exports = {createForm};