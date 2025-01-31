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
        validate: {
            notEmpty: {msg: "Form name is required"},
            len: {args: [3, 100], msg: "Form name must be 3 and 100 characters"},
        },
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {msg: "Category is required"},
            len: {args: [3, 30], msg: "Category must be between 3 and 30 characters"},
        },
    },
    submission_type: {
        type: DataTypes.ENUM('one-time', 'multiple'),
        allowNull: false,
        validate: {
            isIn: {
                args: [['one-time', 'multiple']],
                msg: "Submission type must be either 'one-time' or 'multiple'",
            },
        },
    },
    form_data: {
        type: DataTypes.JSON,
        allowNull: false,
    }
});



module.exports = Form;

