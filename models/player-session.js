const Sequelize = require('sequelize');
const sequelize = require('../db');
const Player = require('./player');
const Session = require('./session');

const Player_Session = sequelize.define('player-session', {
    score: {
        type: Sequelize.INTEGER
    }
});

Player_Session.belongsTo(Player);
Player_Session.belongsTo(Session);

module.exports = Player_Session;