const Sequelize = require('sequelize');
const sequelize = require('../db');

const Player = sequelize.define('player', {
    first_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
});

Player.sync()

module.exports = Player;