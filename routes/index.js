const express = require('express');
const router = express.Router();
const Score = require('../models/score');
const Game = require('../models/game');
const Player = require('../models/player');
const Session = require('../models/session');
const _ = require('lodash');
const ensureAuthenticated = require('../auth').ensureAuthenticated;

/* GET home page. */
router.route('/')
	.get((req, res, next) => {
		if (req.isAuthenticated()) {
			Score.findAll({include: [
				{model: Player, required: true},
				{model: Session, required: true},
				{model: Game, required: true}
			],
				where: {
					playerId: req.user
				},
				order: [
					['updatedAt', 'DESC']
				]
			}).then((result) => {
				console.log(result);
				if (result.length > 0) {
					res.render('index', {
						name: result[0].player.name,
						session: result,
						id: result[0].player.id,
						auth: req.user
					});
				} else {
					Player.findOne({
						where: {
							id: req.user
						}
					}).then((result) => {
						res.render('index', {
							name: result.name,
							auth: req.user
						});
					});
				}
			});
		} else {
			res.render('index');
		}
	});

// Routes
// router.all('*', ensureAuthenticated);

router.route('/scores')
	.all((req, res, next) => {
		if (req.isAuthenticated()) {
			return next();
		}
		res.json([]);
	})
	.get((req, res) => {
    	Score.findAll({include: [
    		{model: Player, required: true},
    		{model: Session, required: true},
    		{model: Game, required: true}
    	]})
  		.then(scores => {
    		res.json(scores);
    	});
  	});

router.route('/games?')
	.all(ensureAuthenticated)
  	.get((req, res) => {
    	Game.findAll()
    	.then(g => {
      		res.render('game-list', {
        		title: 'Game List',
				game: g,
				auth: req.user
      		});
    	});
  	});
  

router.route('/users')
	.all((req, res, next) => {
		if (req.isAuthenticated()) {
			return next();
		}
		res.json([]);
	})
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
	.all(ensureAuthenticated)
    .get((req, res) => {
      	Player.findAll({
        	order: [
          	['name', 'ASC']
        	]
      	})
        .then(playas => {
        	res.render('player-list', {
        	title: 'Players',
			player: playas,
			auth: req.user
          	});
        });
    });


router.route('/players?/:id')
	.all(ensureAuthenticated)
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
				id: req.params.id,
				auth: req.user
        	});
      	});
    });


router.route('/game/new')
	.all(ensureAuthenticated)
    .get((req, res) => {
      	res.render('game-form', {
			title: 'Enter New Game',
			auth: req.user
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
        	res.render('submit-success', {
				auth: req.user
			});
      	});
    });


router.route('/game/update/:id')
	.all(ensureAuthenticated)
    .get((req, res) => {
      	Game.findOne({
        	where: {
          		id: req.params.id
        	}
      	})
      	.then(theGame => {
        	res.render('game-update-form', {
          		id: req.params.id,
          		title: 'Update Game',
          		name: theGame.name,
          		designer: theGame.designer,
          		publisher: theGame.publisher,
          		playTime: theGame.play_time,
		  		playerRange: theGame.player_range,
		  		auth: req.user
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
        	res.render('submit-success', {
				auth: req.user
			})
      	});
    });


router.route('/session/new')
	.all(ensureAuthenticated)
  	.get((req, res) => {
    	Game.findAll()
    	.then(g => {
      		res.render('session-form', {
        		title: 'Log New Session',
				games: g,
				auth: req.user
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
        	res.render('submit-success', {
				auth: req.user
			});
      	});
  	});

module.exports = router;
