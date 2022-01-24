const { DataTypes} = require('sequelize')
const db = require('../config/db')
const User = require('./User')

const History = db.define('history', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ip: {
            type: DataTypes.STRING,
            allowNull: false
        },
        agent: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        token: {
            type: DataTypes.TEXT,
            unique: true,
            allowNull: false
        },
        iat: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        ttl: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
    },{
        tableName: 'histories'
    }
)

User.hasMany(History,{ foreignKey: 'username', sourceKey: 'username'})



module.exports = History