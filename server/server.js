const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

const db = require('./database')

// *** HTTPS SETUP *** //
// var https = require('https');
// var fs = require('fs');

// var options = {
//     key: fs.readFileSync( './localhost.key' ),
//     cert: fs.readFileSync( './localhost.cert' ),
//     requestCert: false,
//     rejectUnauthorized: false
// };

// *** Server Setup *** //

const app = express()
const port = 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('../client/build'))

// *** USERS/AUTHENTICATION *** //

passport.use(new FacebookStrategy({
    clientID: 1207080746061126,
    clientSecret: "8a2a1e7006f4c1c2f5f5f4a449357c5d",
    callbackURL: "http://localhost:3000"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile.id)
  }
));

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));


// *** ROUTES *** //
app.use('/api', require('./api'))

// var server = https.createServer( options, app );
app.listen(port, () => { 
    console.log('Listening on port ' + port)
})
