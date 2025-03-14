const {DataTypes} = require('sequelize');
const sequelize = require('../sequelize');

const Form = sequelize.define('form', {
    form_id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
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
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
    }
});

module.exports = Form;

