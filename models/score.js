const Sequelize = require('sequelize');
const sequelize = require('../db');

const Player = require('./player');
const Session = require('./session');
const Game = require('./game');

const Score = sequelize.define('score', {
    score: {
        type: Sequelize.INTEGER
    },
    createdAt: {
        type: Sequelize.DATEONLY
    }
});

Score.belongsTo(Player);
Score.belongsTo(Session);
Score.belongsTo(Game);

module.exports = Score;