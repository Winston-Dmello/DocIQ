const { DataTypes } = require('sequelize');
const sequelize = require('../../src/sequelize');
const Form = require('./form.model');
const User = require('./user.model');


const Submissions = sequelize.define('submissions', {
    submission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    form_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Form,
            key: 'form_id',
        },
        onDelete: 'CASCADE',
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id',
        },
        onDelete: 'CASCADE',
    },
    submission_data: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Form data is required" },
            isValidJSON(value) {
                if (typeof value !== 'object') {
                    throw new Error("Invalid JSON format");
                }
            }
        }
    },
    status: {
        type: DataTypes.ENUM('pending', 'resubmit', 'approved'),
        allowNull: false,
        defaultValue: 'pending',
    },
    file_paths: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    }
});

module.exports = Submissions;