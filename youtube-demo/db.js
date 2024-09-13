// Get the client
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : 'root',
  database: 'Youtube',
  dateStrings : true
});

// A simple SELECT query
connection.query(
  'SELECT * FROM `user`',
  function (err, results, fields) {
    console.log(results[0]);
    let {u_idx, u_email, u_name} = results[0];
    console.log(u_name);
  }
    
  
);

