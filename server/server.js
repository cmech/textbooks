const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require("express-session")
const mysqlStore = require('express-mysql-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const https = require('https');
const fs = require('fs');
const path = require('path')

const options = {
  key: fs.readFileSync( './localhost.key' ),
  cert: fs.readFileSync( './localhost.cert' ),
  requestCert: false,
  rejectUnauthorized: false
};

const db = require('./database')

const sessionStore = new mysqlStore({
  checkExpirationInterval: 1000 * 60 * 15,// 15 min // How frequently expired sessions will be cleared; milliseconds.
  expiration: 1000 * 60 * 60 * 24 * 365 ,// 1 year // The maximum age of a valid session; milliseconds.
  createDatabaseTable: true,// Whether or not to create the sessions database table, if one does not already exist.
  schema: {
      tableName: 'sessions',
      columnNames: {
          session_id: 'session_id',
          expires: 'expires',
          data: 'data'
      }
  }
}, db);

// *** Server Setup *** //

const app = express()
const port = 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('../client/build'))
app.use(cookieParser())
app.use(session({ secret: 'keyboard cat', store: sessionStore, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'))

// *** USERS/AUTHENTICATION *** //

passport.use('facebook', new FacebookStrategy({
    clientID: 1207080746061126,
    clientSecret: "8a2a1e7006f4c1c2f5f5f4a449357c5d",
    callbackURL: "https://192.168.0.2:5000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'picture']
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile)
    db.query('SELECT * FROM users WHERE fb_id="'+profile.id+'"', (err, rows) => {
      if(rows.length !== 0) {
        let user = rows[0]
        // console.log(rows)
        done(err, user)
      } else {
        db.query('INSERT INTO users (fb_id, name) VALUES ("'+profile.id+'","'+profile.displayName+'")', (err, results) => {
          console.log('created', results)
          db.query('SELECT * FROM users WHERE user_id="'+results.insertId+'"', (err, rows) => {
            let user = rows[0]
            done(err, user)
          })
        })
      }
    })
  }
));

passport.serializeUser(function(user, done) {
  console.log('serialized', user)
  done(null, user.user_id);
});

passport.deserializeUser(function(id, done) {
  console.log('deserialized', id)
  db.query('SELECT * FROM users WHERE user_id="'+id+'"', (err, rows) => {
    if(rows !== []) {
      let user = rows[0]
      done(err, user)
    }
  })
});

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/failure' }));

app.get('/authenticate', authenticate, (req, res) => {
    res.sendStatus(200)
})

function authenticate(req, res, next) {
  console.log(req.isAuthenticated())
  if(req.isAuthenticated()) {
    return next()
  } else {
    res.sendStatus(401)
  }
}

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// *** ROUTES *** //
app.use('/api', require('./api'))

app.get('/*', function(req, res) {
  res.sendFile((path.join(__dirname + '/../client/build/index.html')), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

const server = https.createServer( options, app )

server.listen(port, () => { 
    console.log('Listening on port ' + port)
})
