const Sequelize = require('sequelize');
const sequelize = require('../db');
const Session = require('./session');

const Game = sequelize.define('game', {
    name: {
        type: Sequelize.STRING
    }
});

module.exports = Game;