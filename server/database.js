const mongoose = require('mongoose')

let db = mongoose.connect(
  'mongodb://caleb:' +
    process.env.DB_PASS +
    '@ds157682.mlab.com:57682/textbooks'
)

module.exports = db
