const express = require('express')
const router = express.Router()

const User = require('../models/user')
const Book = require('../models/book')

function processCourses(courses) {
  return courses
    .sort((a, b) => {
      let x = a.code,
        y = b.code
      return x == y ? 0 : x > y ? 1 : -1
    })
    .map(async course => {
      return Book.count({ courses: course.id })
        .exec()
        .then(numBooks => {
          return {
            _id: course._id,
            code: course.code,
            books: numBooks
          }
        })
    })
}

router.get('/:id', (req, res) => {
  const id = req.params.id
  User.findById(id)
    .populate('pinnedCourses')
    .exec()
    .then(user => {
      let pinnedCourses = processCourses(user.pinnedCourses)
      return Promise.all(pinnedCourses).then(results => {
        user.pinnedCourses = results
        return user
      })
    })
    .then(user => {
      res.send(user)
    })
    .catch()
})

router.post('/:userID/pinned/:courseID', (req, res) => {
  const userID = req.params.userID
  const courseID = req.params.courseID

  User.findByIdAndUpdate(userID, { $push: { pinnedCourses: courseID } })
    .exec()
    .then(result => {
      res.send(result)
    })
    .catch()
})

router.delete('/:userID/pinned/:courseID', (req, res) => {
  const userID = req.params.userID
  const courseID = req.params.courseID

  User.findByIdAndUpdate(userID, { $pull: { pinnedCourses: courseID } })
    .exec()
    .then(result => {
      res.send(result)
    })
    .catch()
})

module.exports = router
