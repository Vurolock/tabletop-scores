import { access } from 'fs';

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const Player = require('./models/player');

const setupAuth = (app) => {

    app.use(cookieParser());

    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true
    }));

    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth"
    }, (token, refreshToken, profile, done) => {
        
        Player.findOrCreate({ where: {
            'google.id': profile.id
        }})
        .then(result => {
            let player = result[0];
            return done(null, user);
        })
        .catch(err => {
            console.log('did not work');
            done(err, null);
        });
    }));
}