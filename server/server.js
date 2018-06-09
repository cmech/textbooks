const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const compression = require('compression')
const expressStaticGzip = require('express-static-gzip')

const db = require('./database')

// *** Server Setup *** //

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', expressStaticGzip('../client/build'))
app.use(morgan('dev'))
app.use(compression())

// *** ROUTES *** //
app.use('/api/departments', require('./api/departments'))
app.use('/api/books', require('./api/books'))
app.use('/api/users', require('./api/users'))

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'), function(
    err
  ) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(port, () => {
  console.log('Listening on port ' + port)
})
