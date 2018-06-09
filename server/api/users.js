const express = require('express')
const db = require('../database')
const router = express.Router()

const User = require('../models/user')
const Course = require('../models/course')
const Book = require('../models/book')

router.get('/:id/pinned', (req, res) => {
  const id = req.params.id

  User.findById(id)
    .populate('pinnedCourses')
    .exec()
    .then(result => {
      let courses = result.pinnedCourses
        .sort((a, b) => {
          let x = a.code,
            y = b.code
          return x == y ? 0 : x > y ? 1 : -1
        })
        .map(course => {
          return Book.count({ courses: course.id })
            .exec()
            .then(numBooks => {
              return {
                code: course.code,
                books: numBooks
              }
            })
        })
      return courses
    })
    .then(courses => {
      Promise.all(courses).then(results => {
        res.send(results)
      })
    })
    .catch()
})

router.post('/:id/pinned', (req, res) => {
  const id = req.params.id

  User.findByIdAndUpdate(id, { $push: { pinnedCourses: req.body.courseId } })
    .exec()
    .then(result => {
      res.send(result)
    })
    .catch()
})

module.exports = router
