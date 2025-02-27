const Submissions = require('../models/submissions.model');
const User = require('../models/user.model');
const Form = require('../models/form.model');


Submissions.belongsTo(Form, { foreignKey: 'form_id' });

Submissions.belongsTo(User, { foreignKey: 'user_id' });

Form.hasMany(Submissions, { foreignKey: 'form_id', onDelete: 'CASCADE' });

User.hasMany(Submissions, { foreignKey: 'user_id', onDelete: 'CASCADE' });

module.exports = { Submissions, Form, User };