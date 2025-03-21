const {insertFormIntoDB, getFormsFromDB, getFormById, getFormsByUser, getUsers, updateForm} = require('./form.service');


//Validate payload in controller?   


const createForm = async (req, res, next) => {
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

const getUsersController = async (req, res, next) => {
    try{
        const users = await getUsers();
        if(!users){
            return res.status(404).json({message: 'Users not found'});
        }
        return res.json(users); 
    }catch(error){
        next(error);
    }
}

const updateFormController = async (req, res, next) => { 
    try{
        const form = req.body;
        const {form_id} = req.params;
        const response = await updateForm(form, form_id);
        return res.status(200).json({message: "form updated successfully", form: response});
    }catch(error){
        if (error.status == 400){
            return res.status(400).json(error);
        }
        next(error);
    }
}

module.exports = {
    createForm, 
    getAllForms, 
    getFormByIdController, 
    getFormsByUserController, 
    getUsersController,
    updateFormController};