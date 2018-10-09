const express = require('express')
const router = express.Router()
const passport = require('passport')
const FacebookStrategy = require('passport-facebook')

const User = require('../models/user')
const countBooks = require('../func/countBooks')

passport.use(
  new FacebookStrategy(
    {
      clientID: '1207080746061126',
      clientSecret: '8a2a1e7006f4c1c2f5f5f4a449357c5d',
      callbackURL: 'https://192.168.1.8:5000/api/users/auth/facebook/callback',
      profileFields: ['id', 'displayName']
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(profile)
      User.findOne({ fbID: profile.id })
        .exec()
        .then(user => {
          if (user === null) {
            console.log(profile)
            User.create(
              {
                name: profile.displayName,
                fbID: profile.id
              },
              (err, result) => {
                console.log({ result })
                return cb(err, result)
              }
            )
          } else {
            User.findById(user._id)
              .populate('pinnedCourses')
              .populate('bookmarks')
              .exec()
              .then(user => {
                let pinnedCourses = processCourses(user.pinnedCourses)
                let results = Promise.all(pinnedCourses)
                  .then(results => {
                    user.pinnedCourses = results
                    return user
                  })
                  .then(user => {
                    return cb('', user)
                  })
              })
              .catch(err => console.log(err))
          }
        })
    }
  )
)

function processCourses(courses) {
  return courses
    .sort((a, b) => {
      let x = a.code,
        y = b.code
      return x == y ? 0 : x > y ? 1 : -1
    })
    .map(course => countBooks(course))
}

function getUserData(id) {
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
}

router.get('/loggedin', (req, res) => {
  // console.log(req.user)
  let profile = req.user
  if (profile) {
    User.findOne({ fbID: profile.fbID })
      .exec()
      .then(user => {
        User.findById(user._id)
          .populate('pinnedCourses')
          .populate('bookmarks')
          .exec()
          .then(user => {
            let pinnedCourses = processCourses(user.pinnedCourses)
            let results = Promise.all(pinnedCourses)
              .then(results => {
                user.pinnedCourses = results
                return user
              })
              .then(user => {
                res.json(user)
              })
          })
          .catch(err => console.log(err))
      })
  } else {
    req.json({})
  }
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get(
  '/auth/facebook',
  passport.authenticate('facebook', {
    authType: 'rerequest',
    scope: ['user_link']
  })
)

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/'
  })
)

router.get('/:id', (req, res) => {
  const id = req.params.id
  getUserData(id, res)
})

// router.post('/', (req, res) => {
//   let userData = req.body
//   User.findOne({ fbID: userData.userID })
//     .exec()
//     .then(user => {
//       if (user === null) {
//         User.create(
//           {
//             name: userData.name,
//             fbID: userData.userID
//           },
//           (err, result) => {
//             if (err) throw err
//             res.json(result)
//           }
//         )
//       } else {
//         getUserData(user._id, res)
//       }
//     })
//     .catch(err => console.log(err))
// })

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
