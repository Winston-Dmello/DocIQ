const {DataTypes} = require('sequelize');
const sequelize = require('../sequelize');

const Divisions = sequelize.define('divisions',{
    division_id : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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