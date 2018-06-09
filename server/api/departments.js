const express = require('express')
const db = require('../database')
const router = express.Router()

const Department = require('../models/department')
const Course = require('../models/course')

router.get('/', (req, res) => {
  Department.find()
    .exec()
    .then(result => {
      res.send(result)
    })
    .catch()
})

router.get('/:id', (req, res) => {
  const id = req.params.id

  Course.find({ departmentID: id })
    .select('-departmentID')
    .exec()
    .then(result => {
      res.send(result)
    })
    .catch()
})

module.exports = router
