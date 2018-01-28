const Sequelize = require('sequelize');
const sequelize = require('../db');
const Player = require('./player');

const Message = sequelize.define('message', {
    message: {
        type: Sequelize.STRING
    }
});

Message.belongsTo(Player);

module.exports = Message;