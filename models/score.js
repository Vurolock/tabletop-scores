const Sequelize = require('sequelize');
const sequelize = require('../db');

const Player = require('./player');
const Session = require('./session');

const Score = sequelize.define('score', {
    score: {
        type: Sequelize.INTEGER
    }
});

Score.belongsTo(Player);
Score.belongsTo(Session);

module.exports = Score;