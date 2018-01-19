const Sequelize = require('sequelize');
const sequelize = require('../db');
const Session = require('./session');

const Game = sequelize.define('game', {
    name: {
        type: Sequelize.STRING
    },
    designer: {
        type: Sequelize.STRING
    },
    publisher: {
        type: Sequelize.STRING
    },
    play_time: {
        type: Sequelize.STRING
    },
    player_range: {
        type: Sequelize.STRING
    }
});

module.exports = Game;