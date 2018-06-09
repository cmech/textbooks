const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: String,
  fb: Number,
  pinnedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  markedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
})

module.exports = mongoose.model('User', userSchema)
