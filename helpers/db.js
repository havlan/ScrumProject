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
                        console.log(rows);
                        res.json(rows);
                    } else {
                        console.log("error: Error reading database: " + err);
                        res.status(500);
                        res.json({"error": "Error reading database: " + err});
                    }
                });
            });
        },

        getdbQuery : function(req,res,query,get){
            pool.getConnection(function(err,connection){
                if(err){
                    res.status(500) //err
                    res.json({"Error":"Couldnt connect to MYSQL" + err});
                    return;
                }
                console.log("Connected to database");
                connection.query(query ,get, function(err,rows){
                    connection.release();
                    if(!err) {
                        //res.json(rows);
                        console.log(rows);
                    }else{
                        console.log("error: Error reading database: " + err);
                        res.status(500);
                        console.log("Error reading database: ");
                    }
                });
            });
        },
        getdbQWNext : function(req,res,query,get,next){
            pool.getConnection(function(err,connection){
                if(err){
                    res.status(500) //err
                    res.json({"Error":"Couldnt connect to MYSQL" + err});
                    return;
                }
                console.log("Connected to database");
                connection.query(query ,get, function(err,rows,next){
                    connection.release();
                    if(!err) {
                        //res.json(rows);
                        console.log(rows);
                        next();
                    }else{
                        console.log("error: Error reading database: " + err);
                        res.status(500);
                        console.log("Error reading database: ");
                    }
                });
            });
        },

        postdbQuery : function(req,res,query,post){
            pool.getConnection(function(err,connection){
                if(err){
                    res.status(500) //err
                    res.json({"Error":"Couldnt connect to MYSQL" + err});
                    return;
                }
                console.log("Connected to database");
                connection.query(query ,post, function(err,rows){
                    connection.release();
                    if(!err){
                        res.json(rows);
                    }else{
                        console.log("error: Error reading database: " + err);
                        res.status(500);
                        res.json({"error": "Error reading database: " + err});
                    }
                });
            });
        }
    };


//passport configuration
module.exports = function(passport) {
        /*passport.serializeUser(function(user, done) {
            done(null, {username:user.username,id:user.employee_id, is_admin :user.is_admin});
        });

        // used to deserialize the user
        passport.deserializeUser(function(username, done) {
            pool.query("SELECT * FROM LoginInfo WHERE username = ? ",username, function(err, rows){
                done(err, rows[0]);
            });
        });*/

    passport.serializeUser(function(user,done){
        console.log("SERIALIZING");
        console.log(JSON.stringify(user));
        done(null, {
            username : user.username,
            id: user.employee_id,
            is_admin: user.is_admin
        });
        console.log("DONE SERIALIZING");
    })
    /*passport.deserializeUser(function(username,done){
        pool.query("select * from LoginInfo where username = ?", [username],function(err,rader){
            console.log("USERNAME IN DESERIALIZE",username);
            done(err,rader[0]);
        })
    });*/
    passport.deserializeUser(function(user, done){
        console.log("DESERIALIZING");
        pool.getConnection(function(err, connection){
            if(err){
                return done(err);
            }
            connection.query('select * from LoginInfo where username = ?',[user.username],function(err,rows){
                connection.release();
                if(!rows){
                    return done(null,false, {message:"Incorrect username"});
                }
                if(err){
                    return done(err);
                }
                console.log(rows[0]);
                done(err,rows[0]);
            } );
        });
    });
    passport.use('login',new localStrat({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req,username,password, done) {
            console.log("I LOCAL",req.session);
            pool.getConnection(function(err, connection){
                connection.query("select * from LoginInfo where Username = ?", [username], function (err, rows) {
                    connection.release();
                    //console.log(rows);
                    if (!rows.length) {
                        return done(null, false, req.flash("loginMsg", "No user found."));
                    }
                    if (err) {
                        return done(err);
                    }
                    if (!cryptoHash.sha512(req.body.password, rows[0].password_salt).passwordHash == rows[0].password_hash) {
                        return done(null, false, req.flash("loginMsg", "WHooooooooops, wrong password."));
                    }
                    console.log("LOGIN OK");
                    //req.login(); // wtf man
                    //req.login();
                    console.log("IS AUTH? ",req.isAuthenticated());
                    return done(null, rows[0]);
                })
            });
        }
    ))
}
