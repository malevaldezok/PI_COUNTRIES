const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
    sequelize.define('Activity', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,   
            autoIncrement: true,     
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficulty: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5,
            },
            allowNull: false,
        },
        duration: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 24,
            },
        },
        season: {
            type: DataTypes.ENUM('Summer', 'Autumn', 'Winter', 'Spring'),
            allowNull: false,
        }
    },
    {
        timestamps: false,
    })
}