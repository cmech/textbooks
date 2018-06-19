const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
  code: String,
  title: String,
  departmentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  books: Number
})

module.exports = mongoose.model('Course', courseSchema)
