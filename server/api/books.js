const express = require('express')
const db = require('../database')
const router = express.Router()

const Book = require('../models/book')
const Course = require('../models/course')
const User = require('../models/user')

router.get('/', (req, res) => {
  Book.find()
    .exec()
    .then(books => {
      res.status(200).json(books)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({
        error: err
      })
    })
})

router.post('/', (req, res) => {
  const book = new Book({
    title: req.body.title,
    price: parseInt(req.body.price),
    courses: req.body.courses,
    seller: '5b00769b734d1d0aaaaca1cc'
  })
  book
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Book created',
        createdBook: book
      })
    })
    .catch(err => console.error(err))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  Book.findById(id)
    .populate('seller courses')
    .exec()
    .then(book => {
      if (book) {
        res.status(200).json(book)
      } else {
        res.status(404).json({ message: 'No book found with that ID' })
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: err })
    })
})

router.patch('/:id', (req, res) => {
  const id = req.params.id
  const updateOps = {}
  for (let op of req.body) {
    updateOps[op.propName] = op.value
  }
  Book.where({ _id: id })
    .update(updateOps)
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: err })
    })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  Book.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: err })
    })
})

router.get('/course/:code', (req, res) => {
  const code = req.params.code.replace('_', ' ').toUpperCase()
  Course.findOne({ code })
    .exec()
    .then(course => {
      if (course) {
        Book.find({ courses: course._id })
          .exec()
          .then(books => {
            let result = {
              course,
              books
            }
            if (books.length !== 0) {
              res.status(200).json(result)
            } else {
              res.status(200).json(result)
            }
          })
          .catch()
      } else {
        res.status(404).json({ message: 'Invalid Course Code' })
      }
    })
    .catch()
})
module.exports = router
