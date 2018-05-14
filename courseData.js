#!/usr/bin/env node

const request = require('request')
const program = require('commander')
const mysql = require('mysql')

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "textbooks"
})

con.connect((err) => {
    if(err) throw err
})

function finished(i) {
    console.log(i+ " courses have been added!")
}

function swap(json){
    var ret = {};
    for(var key in json){
      ret[json[key]] = key;
    }
    return ret;
}

const update = () => {
    request({
        url: "https://www.timetablegenerator.io/api/v1/school/mcmaster",
        json: true
    }, (err, res, body) => {
        console.log("Course data was last updated at " + body.last_update)

        let departments = swap(body.departments)
        
        Object.keys(body.courses).forEach((key) => {
            let i = 0
            let numCoursesDep = body.courses[key].length
            

            body.courses[key].forEach(e => {
                department = departments[e.code.split(" ")[0]]
                console.log(department)
                courseCode = e.code
                courseName = e.name

                let query = 'INSERT INTO courses (department, course, name) VALUES ("'+department+'","'+courseCode+'","'+courseName+'")'

                con.query(query, (err, results, fields) => {
                    if(err) throw err
                    i+=1
                    if(i == numCoursesDep) {
                        finished(i)
                    }
                })
            })
        })
        
    })

    
}

program
    .command('update')
    .alias('u')
    .action(() => {
        update()
    })

program.parse(process.argv);