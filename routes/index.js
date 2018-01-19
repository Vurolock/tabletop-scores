var express = require('express');
var router = express.Router();
const Score = require('../models/score');
const Game = require('../models/game');
const Player = require('../models/player');
const Session = require('../models/session');

/* GET home page. */
router.route('/')
  .get((req, res, next) => {
  res.render('index', { title: 'Tabletop Scores' });
});


// Setting up routes
router.route('/games?')
  .get((req, res) => {
    Score.findAll({include: [
      {model: Player, required: true},
      {model: Session, required: true},
      {model: Game, required: true}
    ]
  })
    .then(allScores => {
      console.log(allScores)
      res.render('score-list', {
        title: 'Scores',
        scores: allScores
      });
    });
  });


router.route('/session/new')
  .get((req, res) => {
    Game.findAll()
    .then(g => {
      res.render('session-form', {
        title: 'Log New Session',
        games: g
      })
    })
    
  })


module.exports = router;
