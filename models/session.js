const Sequelize = require('sequelize');
const sequelize = require('../db');
const Game = require('./game');

const Session = sequelize.define('session', {
    createdAt: {
        type: Sequelize.DATEONLY
    }
});

Session.belongsTo(Game);

module.exports = Session;