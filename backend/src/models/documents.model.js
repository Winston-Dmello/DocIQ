const {DataTypes} = require('sequelize');
const sequelize = require('../sequelize');

const Documents = sequelize.define('documents', {
    document_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, 
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
    association: {
        type: DataTypes.STRING,
        allowNull: true,
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