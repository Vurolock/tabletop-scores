const Sequelize = require('sequelize');
const sequelize = new Sequelize('tabletop-scores', '', '', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;