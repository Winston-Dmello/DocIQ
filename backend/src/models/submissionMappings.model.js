const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');
const User = require('../models/user.model');
const Forms = require('../models/form.model'); 
const Submissions = require('../models/submissions.model');

const SubmissionMappings = sequelize.define('submission_mappings', {
    submission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Submissions,
            key: 'submission_id',
        },
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id',
        },
    },
    form_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Forms,
            key: 'form_id',
        },
    },
});

module.exports = SubmissionMappings;