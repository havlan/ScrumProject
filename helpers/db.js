var mysql = require('mysql');
var cryptoHash = require('./../middlewares/cryptoHash');
var localStrat = require('passport-local').Strategy;

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
        getPool : function () {
            return pool;
        },
        dbQuery: function (req, res, query) {
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
                        //console.log(rows);
                        res.json(rows);
                    } else {
                        console.log("error: Error reading database: " + err);
                        res.status(500);
                        res.json({"error": "Error reading database: " + err});
                    }
                });
            });
        },

        getdbQuery: function (req, res, query, get) {
            pool.getConnection(function (err, connection) {
                if (err) {
                    res.status(500) //err
                    res.json({"Error": "Couldnt connect to MYSQL" + err});
                    return;
                }
                console.log("Connected to database");
                connection.query(query, get, function (err, rows) {
                    connection.release();
                    if (!err) {
                        res.json(rows);
                        console.log(rows);
                    } else {
                        console.log("error: Error reading database: " + err);
                        res.status(500);
                        console.log("Error reading database: ");
                    }
                });
            });
        },
        getdbQWNext: function (req, res, query, get, next) {
            pool.getConnection(function (err, connection) {
                if (err) {
                    res.status(500) //err
                    res.json({"Error": "Couldnt connect to MYSQL" + err});
                    return;
                }
                console.log("Connected to database");
                connection.query(query, get, function (err, rows, next) {
                    connection.release();
                    if (!err) {
                        //res.json(rows);
                        console.log(rows);
                        next();
                    } else {
                        console.log("error: Error reading database: " + err);
                        res.status(500);
                        console.log("Error reading database: ");
                    }
                });
            });
        },

        postdbQuery: function (req, res, query, post) {
            pool.getConnection(function (err, connection) {
                if (err) {
                    res.status(500) //err
                    res.json({"Error": "Couldnt connect to MYSQL" + err});
                    return;
                }
                console.log("Connected to database");
                connection.query(query, post, function (err, rows) {
                    connection.release();
                    if (!err) {
                        res.json(rows);
                    } else {
                        console.log("error: Error reading database: " + err);
                        res.status(500);
                        res.json({"error": "Error reading database: " + err});
                    }
                });
            });
        }
    };
