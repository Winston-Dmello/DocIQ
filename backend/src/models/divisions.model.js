const {DataTypes} = require('sequelize');
const sequelize = require('../sequelize');
const { v4: uuidv4 } = require('uuid');


const Divisions = sequelize.define('divisions',{
    division_id : {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: uuidv4,
    },
    division_name : {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    }
}, {
    timestamps: true,
});

module.exports = Divisions;