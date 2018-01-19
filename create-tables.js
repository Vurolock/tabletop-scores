const Score = require('./models/score');
const Game = require('./models/game');
const Player = require('./models/player');
const Session = require('./models/session');

Player.sync({ force: true })
    .then(() => {
        return Game.sync({ force: true })
    })
    .then(() => {
        return Session.sync({ force: true })
    })
    .then(() => {
        return Score.sync({ force: true })
    })
    .then(() => {
        console.log('Tables created.');
    });