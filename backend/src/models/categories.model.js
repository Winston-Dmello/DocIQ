const {DataTypes} = require('sequelize');
const sequelize = require('../sequelize');
const { v4: uuidv4 } = require('uuid');

const Categories = sequelize.define('categories', {
    category_id : {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: uuidv4,
    },
    category_name : {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    }
}, {
    timestamps: true,
});

module.exports = Categories;