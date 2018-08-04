const express = require('express')
const db = require('../database')
const router = express.Router()
const multer = require('multer')
const sharp = require('sharp')

const Book = require('../models/book')
const Course = require('../models/course')
const User = require('../models/user')
const countBooks = require('../func/countBooks')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/uncompressed')
  },
  filename: (req, file, cb) => {
    let extensionIndex = file.originalname.lastIndexOf('.')
    cb(null, Date.now() + file.originalname.substr(extensionIndex))
  }
})

const upload = multer({
  limits: {
    files: 1,
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter,
  storage
})

function fileFilter(req, file, cb) {
  // console.log(file)
  if (/(image)\//.test(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

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

router.post('/', upload.single('bookImage'), (req, res) => {
  const book = new Book({
    title: req.body.title,
    price: parseInt(req.body.price),
    imageID: req.file.filename,
    courses: JSON.parse(req.body.courses),
    seller: '5b00769b734d1d0aaaaca1cc'
  })
  book
    .save()
    .then(() => {
      let input = `./uploads/uncompressed/${book.imageID}`
      let output = `./uploads/compressed/${book.imageID}`
      sharp(input)
        .resize(300, 400)
        .toFile(output)
    })
    .then(result => {
      res.status(201).json({
        message: 'Book created',
        createdBook: book
      })
    })
    .catch(err => console.error(err))
})

router.post('/image', upload.single('bookImage'), (req, res) => {})

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
    .then(course => countBooks(course))
    .then(course => {
      if (course) {
        Book.find({ courses: course._id })
          .sort({ datePosted: -1 })
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
