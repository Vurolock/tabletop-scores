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
    })
    .then(() => {
        return Player.create({
            name: 'Seth Zim',
            email: 'hello@gg.com'
        });
    })
    .then(() => {
        return Player.create({
            name: 'Andrew Kel',
            email: 'adrew@gg.com'
        });
    })
    .then(() => {
        return Game.create({
            name: '7 Wonders',
            designer: 'Antoine Bauza',
            publisher: 'Dude Games',
            player_range: '3-7',
            play_time: '30-60min'
        })
    })
    .then(() => {
        return Game.create({
            name: 'Carcassonne',
            designer: 'A Person',
            publisher: 'Dudette Games',
            player_range: '2-5',
            play_time: '30-45min'
        })
    })
    .then(() => {
        return Game.create({
            name: 'Pandemic',
            designer: 'Matt Leacock',
            publisher: 'Gamey Games',
            player_range: '2-4',
            play_time: '45-60min'
        })
    })
    .then(() => {
        return Session.create({
            gameId: 1,
            player_count: 2
        });
    })
    .then(() => {
        return Score.create({
            score: 23,
            playerId: 2,
            sessionId: 1,
            gameId: 1
        });
    })
    .then(() => {
        return Score.create({
            score: 22,
            playerId: 1,
            sessionId: 1,
            gameId: 1
        });
    })