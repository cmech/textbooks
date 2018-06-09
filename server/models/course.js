const mongoose = require('mongoose')
const Department = require('./department')

const courseSchema = mongoose.Schema({
  code: String,
  title: String,
  departmentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' }
})

module.exports = mongoose.model('Course', courseSchema)
