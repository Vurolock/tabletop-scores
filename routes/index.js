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
		if (req.isAuthenticated()) {
			Player.findOne({
				where: {
					id: req.user
				}
			}).then((result) => {
				res.render('index', {
					name: result.name,
				});
			});
		} else {
			res.render('index');
		}
	});


// Routes
router.route('/scores')
  .get((req, res) => {
    Score.findAll({include: [
      {model: Player, required: true},
      {model: Session, required: true},
      {model: Game, required: true}
    ]
  })
  .then(scores => {
    res.json(scores);
    })
  });

router.route('/games?')
  .get((req, res) => {
    Game.findAll()
    .then(g => {
      res.json(g);
    })
  })
  

router.route('/users')
    .get((req, res) => {
      Player.findAll({
        order: [
          ['createdAt', 'DESC']
        ]
      })
        .then(playas => {
          res.json(playas);
        });
    });


  router.route('/players?')
    .get((req, res) => {
      Player.findAll({
        order: [
          ['name', 'ASC']
        ]
      })
        .then(playas => {
          res.render('player-list', {
          title: 'Players',
          player: playas
          });
        });
      });


  router.route('/players?/:id')
    .get((req, res) => {
      Score.findAll({include: [
        {model: Player, required: true},
        {model: Session, required: true},
        {model: Game, required: true}
      ],
      where: {
        playerId: req.params.id
      },
      order: [
        ['createdAt', 'DESC']
      ]
      })
      .then(result => {
        res.render('player-profile', {
          name: result[0].player.name,
          session: result,
          id: req.params.id
        });
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
        res.render('submit-success');
      });
    });


router.route('/game/update/:id')
    .get((req, res) => {
      Game.findOne({
        where: {
          id: req.params.id
        }
      })
      .then(theGame => {
        res.render('game-form', {
          action: '/update/',
          id: req.params.id,
          title: 'Update Game',
          name: theGame.name,
          designer: theGame.designer,
          publisher: theGame.publisher,
          playTime: theGame.play_time,
          playerRange: theGame.player_range
        });
      });
    })
    .post((req, res) => {
      Game.findOne({
        where: {
          id: req.params.id
        }
      })
      .then(theGame => {
        theGame.update({
          name: _.startCase(_.lowerCase(req.body.name)),
          designer: _.startCase(_.lowerCase(req.body.designer)),
          publisher: _.startCase(_.lowerCase(req.body.publisher)),
          play_time: `${req.body.playTime}min`,
          player_range: req.body.numPlayers
        });
      })
      .then(updated => {
        res.render('submit-success', {})
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
