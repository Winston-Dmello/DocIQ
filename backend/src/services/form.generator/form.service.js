const Form = require('../../models/form.model');
const {ValidationError} = require('sequelize');

const insertFormIntoDB = async (form) => {
    try{
        const response = await Form.create({
            form_name: form.form_name,
            category: form.category,
            submission_type: form.submission_type,
            form_data: form.form_data
        });
        return response;
    }catch(error){
        if(error instanceof ValidationError){
            throw {
                status: 400,
                message: "Validation Error",
                error: error.errors.map(err => err.message),
            }
        }
        throw error;
    }
}

module.exports = {insertFormIntoDB};