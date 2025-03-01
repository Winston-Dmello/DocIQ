const {DataTypes} = require('sequelize');
const sequelize = require('../sequelize');

const Categories = sequelize.define('categories', {
    category_id : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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