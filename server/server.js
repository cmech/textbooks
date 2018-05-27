const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const db = require('./database')

// *** Server Setup *** //

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('../client/build'))
app.use(morgan('dev'))


// *** ROUTES *** //
// app.use('/api', require('./api'))

app.get('/*', function(req, res) {
  res.sendFile((path.join(__dirname + '/../client/build/index.html')), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(port, () => { 
    console.log('Listening on port ' + port)
})
