const express = require('express')
const db = require('./database')
const router = express.Router()

// *** BOOKS *** //

router.get('/books', (req, res) => {
    db.query("SELECT * FROM books", (err, rows) => {
        if(err) throw err
        res.render(rows)
    })
})

router.get('/books/:id', (req, res) => {
    let id = parseInt(req.params.id)
    if(id) {
        let query = "SELECT * FROM books INNER JOIN users ON books.user_id = users.user_id INNER JOIN book_courses ON books.book_id = book_courses.book_id INNER JOIN courses ON book_courses.course_id = courses.course_id WHERE books.book_id =" + id
        db.query(query, (err, rows) => {
            if(err) throw err
            if(rows.length != 0) {
                let row = rows[0]
                let courses = rows.map((row) => {
                    return { id: row.course_id, code: row.course }
                })
                let data = {
                    id: row.book_id,
                    title: row.title,
                    price: row.price,
                    courses: courses,
                    seller: {
                        id: row.user_id,
                        fb: row.fb_id,
                        name: row.first_name+" "+row.last_name
                    },
                    datePosted: row.date_created,
                }
                res.send(data)
            } else {
                res.sendStatus(204)
            }
        })
    } else {  
        res.sendStatus(400)
    }
})

router.post('/books', (req, res) => {
    let title = req.body.bookTitle
    let price = req.body.bookPrice
    let query = "INSERT INTO books (title, price) VALUES ('"+title+"', '"+price+"')"
    db.query(query, (err, rows) => {
        if(err) throw err
        res.status(201)
    })
})

router.delete('/books/:id', (req, res) => {
    db.query("DELETE FROM books WHERE book_id =" + req.params.id, (err, rows) => {
        if(err) throw err
        if(rows.changedRows != 0) {
            res.status(204).send('Deleted!')
        } else {
            res.status(404).send('Book does not exist')
        }
    })
})

router.get('/books/course/:id', (req, res) => {
    db.query("SELECT * FROM books INNER JOIN book_courses ON books.book_id = book_courses.book_id WHERE course_id =" + req.params.id, (err, bookRows) => {
        
        db.query("SELECT course FROM courses WHERE course_id=" + req.params.id, (err, courseRow) => {

            let books = bookRows.map(row => {
                return {
                    id: row.book_id,
                    title: row.title,
                    price: row.price,
                }
            })
            let data = {
                course: courseRow[0].course,
                books: books
            }
            res.send(data)
        })
    })
})

// *** DEPARTMENTS/COURSES *** //

router.get('/departments/', (req, res) => {
    db.query("SELECT * FROM departments ORDER BY department ASC", (err, rows) => {
        if(err) throw err
        let data = rows.map(row => {
            return {
                id: row.department_id,
                name: row.department
            }
        })
        res.send(data)
    })
})

router.get('/departments/:id/courses', (req, res) => {
    if(req.params.id != 'undefined') {
        db.query("SELECT course_id, course FROM courses WHERE department_id=" + req.params.id, (err, rows) => {
            if(err) throw err
            let data = rows.map(row => {
                return {
                    id: row.course_id,
                    code: row.course
                }
            })
            res.send(data)
        })
    } else {
        res.send([])
    }
})  

module.exports = router
