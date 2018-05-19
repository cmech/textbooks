const express = require('express')
const bodyParser = require('body-parser')
const db = require('./database')
// const passport = require('passport'), LocalStrategy = require('passport-local').Strategy

// *** Server Setup *** //

const app = express()
const port = 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('build'))
// app.use(express.static('client/dist/client'))
// app.set('view engine', 'pug')

// app.use(passport.initialize())
// app.use(passport.session())

// *** ROUTES *** //

// app.use('/', require('./routes/index'))
app.use('/api', require('./routes/api'))

db.query("SELECT * FROM departments ORDER BY department ASC", (err, rows) => {
    app.locals.departments = rows
})

app.listen(port, () => { 
    console.log('Listening on port ' + port)
})
