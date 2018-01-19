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
router.route('/session')
  .get((req, res) => {
    Score.findAll({include: [
      {model: Game, required: true},
      {model: Player, required: true},
      {model: Session, required: true}
    ]
  })
  // // WORKING ON THIS
  //   .then(allSessions => {

  //     res.render('session-list', {
  //       sessions: allSessions,
  //       title: 'Sessions'
  //     });
  //   })
  })



module.exports = router;
