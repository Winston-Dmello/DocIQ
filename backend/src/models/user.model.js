const {DataTypes} = require('sequelize');
const sequelize = require('../sequelize');

const User = sequelize.define('user', {
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,        
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    role: {
        type: DataTypes.ENUM("user", "admin"),
        allowNull: false,
    },
    division: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = User;  