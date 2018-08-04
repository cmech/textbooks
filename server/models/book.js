const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
  title: String,
  price: Number,
  datePosted: {
    type: Date,
    default: Date.now
  },
  imageID: String,
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Book', bookSchema)
