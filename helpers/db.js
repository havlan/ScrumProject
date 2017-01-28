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
        dbQuery: function (req, res, query) {
            pool.getConnection(function (err, connection) {
                if (err) {
                    res.status(500); // Internal server error
                    res.json({"error": "Error connecting to database: " + err});
                    return;
                }
                connection.query(query, function (err, rows) {
                    connection.release(); // Legg tilbake i pool
                    if (!err) {
                        //console.log(rows);
                        res.status(200);
                        res.json(rows);
                    } else {
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
                connection.query(query, get, function (err, rows) {
                    connection.release();
                    if (!err) {
                        if(rows.length > 0) {

                            res.status(200).json(rows);
                            //console.log(rows);
                        }else{
                            res.status(404)
                        }
                    } else {
                        res.status(500);
                        console.log("Error reading database: ");
                    }
                });
            });
        },

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
        },

        fallDoubleQuery : function (tasks, cb) {
        pool.getConnection(function (err, conn, done) {
            if (err) {
                return cb(err);
            }
            conn.beginTransaction(function (err) {
                if (err) {
                    done();
                    return cb(err);
                }
                conn.query(q1, function(err){
                    if(err){
                        done();
                        return cb(err);
                    }
                })
                var wrapIterator = function (iterator) {
                    return function (err) {
                        if (err) {
                            conn.rollback( function () {
                                done();
                                cb(err);
                            });
                        }
                        else {
                            var args = Array.prototype.slice.call(arguments, 1);
                            var next = iterator.next();
                            if (next) {
                                args.unshift(conn);
                                args.push(wrapIterator(next));
                            }
                            else {
                                args.unshift(conn);
                                args.push(function (err, results) {
                                    var args = Array.prototype.slice.call(arguments, 0);
                                    if (err) {
                                        conn.rollback(function () {
                                            done();
                                            cb(err);
                                        });
                                    } else {
                                        conn.commit( function () {
                                            done();
                                            cb.apply(null, args);
                                        })
                                    }
                                })
                            } async.setImmediate(function () {
                                iterator.apply(null, args);
                            });
                        }
                    };
                };
                wrapIterator(async.iterator(tasks))();
            });
        });
        }
    };
