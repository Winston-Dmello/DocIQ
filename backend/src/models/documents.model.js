const {DataTypes} = require('sequelize');
const sequelize = require('../sequelize');
const { v4: uuidv4 } = require('uuid');


const Documents = sequelize.define('documents', {
    document_id: {
        type: DataTypes.UUID,
        primaryKey: true, 
        defaultValue: uuidv4,
        allowNull: false,
    },
    form_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    submission_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    file_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    division_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    meta_data: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    file_path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    }
});

module.exports = Documents;

//document_id, form_name, user_name, file_name, division_name, category, file_path, date