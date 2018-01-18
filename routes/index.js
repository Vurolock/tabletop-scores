var express = require('express');
var router = express.Router();
const Session = require('../models/session');

/* GET home page. */
router.route('/')
  .get((req, res, next) => {
  res.render('index', { title: 'Tabletop Scores' });
});
// Setting up routes
router.route('/session')
  .get((req, res) => {
    res.render('session-list', {
      listItems: Session
    });
  })



module.exports = router;
