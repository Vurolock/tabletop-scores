var express = require('express');
var router = express.Router();
const Score = require('../models/score');
const Game = require('../models/game');
const Player = require('../models/player');
const Session = require('../models/session');

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

// Setting up routes
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
    	console.log(req.body)
    	Session.create({
      		gameId: req.body.gameId
    	})
      	.then((sesh) => {
        	for (let i = 0; i < req.body.score.length; i++) {
          		Score.create({
            		score: req.body.score[i],
            		playerId: req.body.name[i],
            		sessionId: sesh.id,
            		gameId: req.body.gameId
          		});
        	}
      	})
      	.then(() => {
        	res.render('submit-success', {});
      	});
  	});

module.exports = router;
