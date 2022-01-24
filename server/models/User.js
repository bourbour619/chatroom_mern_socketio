const { DataTypes} = require('sequelize')
const db = require('../config/db')

const User = db.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(1000),
            unique: true,
            primaryKey: true,
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        who: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('logged_in','logged_out'),
            defaultValue: 'logged_out'
        }
    }, {
        tableName: 'users',
    }
)


module.exports = User