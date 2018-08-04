const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()

const saltRounds = 10

const User = require('../models/user')
const countBooks = require('../func/countBooks')

function processCourses(courses) {
  return courses
    .sort((a, b) => {
      let x = a.code,
        y = b.code
      return x == y ? 0 : x > y ? 1 : -1
    })
    .map(course => countBooks(course))
}

function getUserData(id, res) {
  User.findById(id)
    .populate('pinnedCourses')
    .populate('bookmarks')
    .exec()
    .then(user => {
      let pinnedCourses = processCourses(user.pinnedCourses)
      return Promise.all(pinnedCourses).then(results => {
        user.pinnedCourses = results
        return user
      })
    })
    .then(user => {
      res.json(user)
    })
    .catch()
}

router.get('/:id', (req, res) => {
  const id = req.params.id
  getUserData(id, res)
})

router.post('/', (req, res) => {
  let userData = req.body
  User.findOne({ email: userData.email })
    .exec()
    .then(user => {
      if (user === null) {
        if (userData.name !== undefined && userData.signup === true) {
          bcrypt.hash(userData.password, saltRounds, (err, hash) => {
            User.create(
              { email: userData.email, password: hash, name: userData.name },
              (err, result) => {
                if (err) throw err
                res.json(result)
              }
            )
          })
        } else {
          res.sendStatus(404)
        }
      } else {
        bcrypt.compare(userData.password, user.password, (err, isValid) => {
          if (isValid) {
            getUserData(user._id, res)
          } else {
            res.sendStatus(403)
          }
        })
      }
    })
    .catch(err => console.log(err))
})

router.post('/:userID/pinned/:courseID', (req, res) => {
  const userID = req.params.userID
  const courseID = req.params.courseID

  User.findByIdAndUpdate(userID, { $push: { pinnedCourses: courseID } })
    .exec()
    .then(result => {
      res.json(result)
    })
    .catch()
})

router.delete('/:userID/pinned/:courseID', (req, res) => {
  const userID = req.params.userID
  const courseID = req.params.courseID

  User.findByIdAndUpdate(userID, { $pull: { pinnedCourses: courseID } })
    .exec()
    .then(result => {
      res.json(result)
    })
    .catch()
})

router.post('/:userID/bookmarks/:bookID', (req, res) => {
  const userID = req.params.userID
  const bookID = req.params.bookID

  User.findByIdAndUpdate(userID, { $push: { bookmarks: bookID } })
    .exec()
    .then(result => {
      res.json(result)
    })
    .catch()
})

router.delete('/:userID/bookmarks/:bookID', (req, res) => {
  const userID = req.params.userID
  const bookID = req.params.bookID

  User.findByIdAndUpdate(userID, { $pull: { bookmarks: bookID } })
    .exec()
    .then(result => {
      res.json(result)
    })
    .catch()
})

module.exports = router
