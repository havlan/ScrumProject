var mysql = require('mysql');
var cryptoHash = require('./../middlewares/cryptoHash');
var async = require('async');
var expressValidator = require('express-validator')


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

        /**
         * Connects to the database and executes the inserted query.
         * Sends back the result. Used for GET-requests.
         * @function
         * @param req
         * @param res
         * @param query
         * @param get
         */
        getdbQuery: function (req, res, query, get) {
            pool.getConnection(function (err, connection) {
                if (err) {
                    res.status(500) //err
                    res.json({"Error": "Couldnt connect to MYSQL" + err});
                    return;
                }
                connection.query(query, get, function (err, rows) {
                    connection.release();
                    if (!err) {
                        if(rows) {
                            res.status(200).json(rows);
                        }else{
                            res.status(404)
                        }
                    } else {
                        res.status(500);
                    }
                });
            });
        },

        /**
         * Connects to the database and executes the inserted query.
         * Sends back the result. Used for POST-requests.
         * @function
         * @param req
         * @param res
         * @param query
         * @param post
         */
        postdbQuery: function (req, res, query, post) {
            pool.getConnection(function (err, connection) {
                try {
                    if (err) {
                        res.status(500) //err
                        res.json({"Error": "Couldnt connect to MYSQL" + err});
                        throw err;
                    }
                    connection.query(query, post, function (err, rows) {
                        connection.release();
                        if (!err) {
                            res.json(rows);
                        } else if (err) {
                            if (!err.fatal) {
                                res.status(409).json({melding: "Eksisterer."});
                            } else {
                                res.status(500);
                            }
                        } else {
                            res.status(500);
                            res.json({"error": "Error reading database: " + err});
                            throw err;
                        }
                    });
                }catch (err){
                    throw err;
                }
            });
        },

        revertTest : function(query){
            pool.getConnection(function(err,conn){
                if(err) {
                    throw err;
                }
              conn.query(query, function(err,res){
                  conn.release();
                  if(!err) {
                      throw err;
                  }
              })
            })
        }
    };
