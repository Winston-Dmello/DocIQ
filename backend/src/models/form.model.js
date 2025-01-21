const {DataTypes} = require('sequelize');
const sequelize = require('../sequelize');

const Form = sequelize.define('form', {
    formID : {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    data : {
        type: DataTypes.JSON,
        allowNull: false,
    }
});

module.exports = Form;

