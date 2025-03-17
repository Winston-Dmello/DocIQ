const {DataTypes} = require('sequelize');
const sequelize = require('../sequelize');
const { v4: uuidv4 } = require('uuid');

const Form = sequelize.define('form', {
    form_id : {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        defaultValue: uuidv4,
        primaryKey: true,
    }, 
    form_name : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    submission_type: {
        type: DataTypes.ENUM('one-time', 'multiple'),
        allowNull: false,
    },
    form_data: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
    },
    recipients: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: false,
    }
});

module.exports = Form;

