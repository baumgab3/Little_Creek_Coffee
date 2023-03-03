const mysql = require('mysql');

const conn = mysql.createConnection({
    host     : process.env.SQL_HOST,
    user     : process.env.SQL_USER,
    password : process.env.SQL_PASSWORD,
    database : process.env.SQL_DATABASE
});


conn.connect((err) => {
    if (err) throw err;
    console.log("connected to db");
})

module.exports = conn;