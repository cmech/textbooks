const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  fbID: Number,
  pinnedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
})

module.exports = mongoose.model('User', userSchema)
