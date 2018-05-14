const mysql = require('mysql')

let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "textbooks"
})

db.connect((err) => {
    if(err) throw err
    console.log("Connected to database!")
})

module.exports = db