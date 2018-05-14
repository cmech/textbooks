const express = require('express')
const db = require('../database')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/courses/:id', (req, res) => {
    db.query("SELECT * FROM books INNER JOIN book_courses ON books.book_id = book_courses.book_id WHERE course_id =" + req.params.id, (err, rows) => {
        if(err) throw err
        res.render('search', { books: rows, course_id: req.params.id })
    })
})

module.exports = router