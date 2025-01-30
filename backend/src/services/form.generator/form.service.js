const Form = require('../../models/form.model');


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
        console.log(error);
    }
}

module.exports = {insertFormIntoDB};