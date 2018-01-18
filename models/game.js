const Sequelize = require('sequelize');
const sequelize = require('../db');

const Game = sequelize.define('game', {
    title: {
        type: Sequelize.STRING
    }
});

module.exports = Game;