const {DataTypes} = require('sequelize');
const sequelize = require('../sequelize');
const { v4: uuidv4 } = require('uuid');

const User = sequelize.define('user', {
    user_id:{
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: uuidv4,
        unique: true,
        primaryKey: true,
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