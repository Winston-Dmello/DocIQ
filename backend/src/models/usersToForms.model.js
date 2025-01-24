const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');
const User = require('../models/user.model');
const Forms = require('../models/form.model'); 

const UsersToForms = sequelize.define('users_to_forms', {
    form_status: {
        type: DataTypes.ENUM('open', 'close'),
        allowNull: false,
        defaultValue: 'open',
    }
});

User.belongsToMany(Forms, {
    through: UsersToForms,
    foreignKey: 'user_id',
    otherKey: 'form_id',
});

Forms.belongsToMany(User, {
    through: UsersToForms,
    foreignKey: 'form_id',
    otherKey: 'user_id',
});

module.exports = UsersToForms;

