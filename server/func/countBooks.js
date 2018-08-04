const Book = require('../models/book')

async function countBooks(course) {
  return Book.count({ courses: course.id })
    .exec()
    .then(numBooks => {
      course.books = numBooks
      return course
    })
}

module.exports = countBooks
