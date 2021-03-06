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

    // callbackURL: process.env.CALLBACK_URL
    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    }, (accessToken, refreshToken, profile, done) => {
        
        Player.findOrCreate({ where: {
            'google_id': profile.id,
            'name': profile.displayName,
            'email': profile.emails[0].value
        }})
        .then(result => {
            let user = result[0];
            return done(null, user);
        })
        .catch(err => {
            console.log('did not work');
            done(err, null);
        });
    }));

    passport.serializeUser((user, done) => {
        console.log('serializing');
        // console.log(user);
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        console.log('deserializing');
        // console.log(id);
        done(null, id);
    });

    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get('/logout', (req, res, next) => {
        console.log('logging out');
        // req.logout();
        req.session.destroy((err) => {
            res.redirect('/');
        });
    });

    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/' }),
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
    res.redirect('/auth/google');
}

module.exports = setupAuth;
module.exports.ensureAuthenticated = ensureAuthenticated;