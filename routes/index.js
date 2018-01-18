var express = require('express');
var router = express.Router();
const Player_Session = require('../models/player-session');
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
    Player_Session.findAll({include: [
      {model: Game, required: true},
      {model: Player, required: true},
      {model: Session, required: true}
    ]
  })
  // WORKING ON THIS
    .then(allSessions => {

      res.render('session-list', {
        sessions: allSessions,
        title: 'Sessions'
      });
    })
  })



module.exports = router;
