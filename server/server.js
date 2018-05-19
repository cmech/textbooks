const express = require('express')
const bodyParser = require('body-parser')
const db = require('./database')

// *** Server Setup *** //

const app = express()
const port = 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('build'))

// *** ROUTES *** //
app.use('/api', require('./routes/api'))

app.listen(port, () => { 
    console.log('Listening on port ' + port)
})
