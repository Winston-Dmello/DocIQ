const { DataTypes } = require('sequelize');
const sequelize = require('../../src/sequelize');
const Form = require('./form.model');
const User = require('./user.model');
const { v4: uuidv4 } = require('uuid');

const Submissions = sequelize.define('submissions', {
    submission_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: uuidv4,
        primaryKey: true,
    },
    form_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Form,
            key: 'form_id',
        },
        onDelete: 'CASCADE',
    },
    user_id: {
        type: DataTypes.UUID,
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
        }
    },
    status: {
        type: DataTypes.ENUM('pending', 'resubmit', 'approved'),
        allowNull: false,
        defaultValue: 'pending',
    },
    file_paths : {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

module.exports = Submissions;