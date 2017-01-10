var mysql = require('mysql');

var connection = mysql.createConnection({
    connectionLimit: 27,
    host : 'mysql.stud.iie.ntnu.no',
    user : 'g_scrum04',
    password: 'gBq9reK7',
    database: 'g_scrum04',
    debug: false
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
});
