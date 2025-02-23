const {insertFormIntoDB, getFormsFromDB, getFormById, getFormsByUser} = require('./form.service');


//Validate payload in controller?   


const createForm = async (req, res, next) => {
    // if (req.user.role != "admin"){
    //     res.status(403).json({message: "Forbidden route"});
    // }
    try{
        const form = req.body;
        const response = await insertFormIntoDB(form); //returns the created form
        return res.status(200).json({message: "form created successfully", form: response});
    }catch(error){
        if (error.status == 400){
            return res.status(400).json(error);
        }
        next(error);
    }
}

const getAllForms = async (req, res, next) => {
    try{
        const forms = await getFormsFromDB();
        return res.status(200).json({forms: forms});
    }catch(error){
        next(error);
    }
}

const getFormsByUserController = async (req, res, next) => {
    try{
        const {user_id}= req.params;
        const forms = await getFormsByUser(user_id);
        if (!forms){
            return res.status(404).json({message: 'No Forms Found'});
        }
        return res.json(forms);
    }catch(error){
        next(error);
    }
}

const getFormByIdController = async (req, res, next) => {
    try{
        const {form_id} = req.params;
        const form = await getFormById(form_id);
        if (!form){
            return res.status(404).json({message: 'Form not found'});
        }
        return res.json(form);
    }catch(error){
        next(error);
    }
}

module.exports = {createForm, getAllForms, getFormByIdController, getFormsByUserController};