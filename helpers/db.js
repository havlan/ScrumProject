var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 27,
    host: 'mysql.stud.iie.ntnu.no',
    user: 'g_scrum04',
    password: 'gBq9reK7',
    database: 'g_scrum04',
    debug: false
});


module.exports =
{
    getConnection:function (req, res, query) {
        pool.getConnection(function (err, connection) {
            if (err) {
                res.status(500); // Internal server error
                res.json({"error": "Error connecting to database: " + err});
                return;
            }
            console.log('Connected to database');
            connection.query(query, function (err, rows) {
                connection.release(); // Legg tilbake i pool
                if (!err) {
                    console.log(rows);
                    res.json(rows);
                } else {
                    res.status(500);
                    res.json({"error": "Error reading database: " + err});
                }
            });
        });
    }
};