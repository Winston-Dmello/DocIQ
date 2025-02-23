const Form = require('../../models/form.model');
const sequelize = require('../../sequelize');
const UsersToForms = require('../../models/usersToForms.model');
const User = require('../../models/user.model');


const insertFormIntoDB = async (form) => {
    const transaction = await sequelize.transaction();
    try{
        const newForm = await Form.create({
            form_name: form.form_name,
            category: form.category,
            submission_type: form.submission_type,
            form_data: form.form_data,
            recipients: form.recipients
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
    try {
        const forms = await Form.findAll();

        for (const form of forms) {
            const recipientUsers = await Promise.all(
                form.recipients.map(async (recipientId) => {
                    return await User.findOne({
                        where: {
                            user_id: recipientId
                        }, 
                        attributes: ["user_id", "email"]
                    });
                })
            );

            form.recipients = recipientUsers; // Replace recipient IDs with user objects
        }

        return forms;
    } catch (error) {
        console.error("Error fetching forms with recipients:", error);
        throw error;
    }
};

const getFormById = async(form_id) => {
    try{
        const form = await Form.findOne({where: {form_id: form_id}});
        return form;
    }catch(error){
        console.error("Error fetching form");
        throw error;
    }
}

const getFormsByUser = async(user_id) => {
    try{
        const usersToFormsRecords = await UsersToForms.findAll({where: {user_id: user_id}});
        let forms = [];
        for(let i = 0; i < usersToFormsRecords.length; i++){
            let form_id = usersToFormsRecords[i].form_id;
            const form = await Form.findOne({where: {form_id: form_id}});
            const { form_name } = form;
            const status = usersToFormsRecords[i].form_status;
            forms.push({form_id, form_name, status});
        }
        return forms;
    }catch(error){  
        console.error("Error fetching forms by user");
        throw error;
    }
}

module.exports = {insertFormIntoDB, getFormsFromDB, getFormById, getFormsByUser};