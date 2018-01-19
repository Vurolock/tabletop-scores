import { access } from 'fs';

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const session = require('express-session');
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
        callbackURL: "http://localhost:3000/google/auth"
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

    passport.serializeUser((user, done) => {
        console.log('serializing');
        console.log(user);
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        console.log('deserializing');
        console.log(id);
        done(null, id);
    });

    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/login', passport.authenticate('google'));
    app.get('/logout', (req, res, next) => {
        console.log('logging out');
        req.logout();
        res.redirect('/');
    });
    app.get('/google/auth',
        passport.authenticate('google', { failureRedirect: '/login' }),
        (req, res) => {
            console.log('login successful');
            console.log(req.isAuthenticated());
            res.redirect('/');
        }
    );
}

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log('auth all good')
        console.log(req.user);
        return next();
    }
    
    console.log('auth all bad');
    res.redirect('/login');
}

module.exports = setupAuth;
module.exports.ensureAuthenticated = ensureAuthenticated;