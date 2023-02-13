const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Poster extends Model {}

Poster.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        comment_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'comment',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'poster',
    }
);

module.exports = Poster;