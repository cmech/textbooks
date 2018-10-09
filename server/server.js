const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const compression = require('compression')
const expressStaticGzip = require('express-static-gzip')
const https = require('https')
const fs = require('fs')
const passport = require('passport')

passport.serializeUser(function(user, cb) {
  cb(null, user)
})

passport.deserializeUser(function(obj, cb) {
  cb(null, obj)
})

// *** Server Setup *** //

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', expressStaticGzip('../client/build'))
app.use(morgan('dev'))
app.use(compression())
app.use(require('cookie-parser')())
app.use(
  require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  })
)

app.use(passport.initialize())
app.use(passport.session())

// *** ROUTES *** //
app.use('/api/departments', require('./api/departments'))
app.use('/api/books', require('./api/books'))
app.use('/api/users', require('./api/users'))
app.use('/bookImages', express.static('./uploads'))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'), err => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

const httpsOptions = {
  key: fs.readFileSync('./localhost.key'),
  cert: fs.readFileSync('./localhost.cert')
}
const server = https.createServer(httpsOptions, app).listen(port, () => {
  console.log('Listening on port ' + port)
})
