const Form = require('../../models/form.model');
const {ValidationError} = require('sequelize');
const sequelize = require('../../sequelize');
const UsersToForms = require('../../models/usersToForms.model');

const insertFormIntoDB = async (form) => {
    const transaction = await sequelize.transaction();
    try{
        const newForm = await Form.create({
            form_name: form.form_name,
            category: form.category,
            submission_type: form.submission_type,
            form_data: form.form_data
        }, { transaction });

        const recipients = form.recipients;

        if(recipients && recipients.length > 0){
            const recipientEntries = recipients.map(user_id => ({
                user_id: user_id,
                form_id: newForm.form_id,
                form_status: 'open',
            }));

            await UsersToForms.bulkCreate(recipientEntries, { transaction });
        }   
        await transaction.commit();
        return newForm;
    }catch(error){
        await transaction.rollback();
        throw error;
    }
};

const getFormsFromDB = async () => {
    try{
        const forms = await Form.findAll();
        console.log(forms);
        return forms;
    }catch(error){
        throw error;
    }
}

module.exports = {insertFormIntoDB, getFormsFromDB};