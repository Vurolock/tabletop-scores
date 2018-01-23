var express = require('express');
var router = express.Router();
const Score = require('../models/score');
const Game = require('../models/game');
const Player = require('../models/player');
const Session = require('../models/session');
const _ = require('lodash');

/* GET home page. */
router.route('/')
  .get((req, res, next) => {
  res.render('index', { title: 'Tabletop Scores' });
});


// Routes
router.route('/scores?')
  .get((req, res) => {
    Score.findAll({include: [
      {model: Player, required: true},
      {model: Session, required: true},
      {model: Game, required: true}
    ]
  })
    .then(allScores => {
      res.render('score-list', {
        title: 'Scores',
        scores: allScores
      });
    });
  });
  

router.route('/players')
    .get((req, res) => {
      Player.findAll()
        .then(playas => {
          res.json(playas);
        });
    });


router.route('/game/new')
    .get((req, res) => {
      res.render('game-form', {
        title: 'Enter New Game'
      });
    })
    .post((req, res) => {
      Game.create({
        name: _.startCase(_.lowerCase(req.body.name)),
        designer: _.startCase(_.lowerCase(req.body.designer)),
        publisher: _.startCase(_.lowerCase(req.body.publisher)),
        play_time: `${req.body.playTime}min`,
        player_range: req.body.numPlayers
      })
      .then(() => {
        res.render('submit-success', {});
      });
    });


router.route('/session/new')
  .get((req, res) => {
    Game.findAll()
    .then(g => {
      res.render('session-form', {
        title: 'Log New Session',
        games: g
      });
    });
  })
  .post((req, res) => {
    console.log(req.body);
    const score = _.isArray(req.body.score) ? req.body.score : [req.body.score];
    Session.create({
      gameId: req.body.gameId
    })
      .then((sesh) => {
        for (let i = 0; i < score.length; i++) {
          Score.create({
            score: score[i],
            playerId: req.body.name[i],
            sessionId: sesh.id,
            gameId: req.body.gameId
          });
        }
      })
      .then(() => {
        res.render('submit-success', {});
      });
  });;


module.exports = router;
