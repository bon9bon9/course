const mysql = require('mysql2');

const conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'book_shop',
    dateStrings : true
});

module.exports = conn;