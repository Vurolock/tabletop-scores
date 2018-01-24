const Sequelize = require('sequelize');
const sequelize = require('../db');

const Player = sequelize.define('player', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    google_id: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATEONLY
    }
});

module.exports = Player;