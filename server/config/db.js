const { Sequelize } = require('sequelize')

const db = new Sequelize('auth_db', 'postgres', 'admin123#$', {
    host: 'localhost',
    dialect: 'postgres'
});



module.exports = db 