const { DataTypes } = require('sequelize');
const sequelize = require('../../src/sequelize');

const Submissions = sequelize.define('submissions', {
    submission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    submission_data: {
        type: DataTypes.JSON,
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
    file_path: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Submissions;