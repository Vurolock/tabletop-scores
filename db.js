const Sequelize = require('sequelize');
const sequelize = new Sequelize('tabletop-scores', 'sethzimmerman', '', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;