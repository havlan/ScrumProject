var queries = require('../middlewares/dbQ1');
var crypt = require('../middlewares/cryptoHash');
var nodemailer = require('nodemailer');
var async = require('async');
var pool = require('../helpers/db').getPool();

var transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: 'minvakt.ikkesvar@outlook.com',
        pass: 'Abigail4prez'
    }
});
var mailOptions;

function sendMailUser(req, mail, pw) {
    mailOptions = {
        from: '"MinVakt" <minvakt.ikkesvar@outlook.com>', //Abigail4prez
        to: mail,
        subject: 'Velkommen til min vakt!',
        text: 'Velkommen til Trondheim og systemet MinVakt.\nMin jobb er å gjøre din hverdag lettere.\n' +
        'Brukernavn: ' + req.body.username + '\nPassord:' + pw + '\nVennligst bytt passord når du har logget inn.'
    };
    transporter.sendMail(mailOptions, function (err, inf) {
        if (!err) console.log(inf.response);
        else console.log(err);
    })
}


module.exports = {
    forgotPwMail: function (request, response) { // email, username
        async.waterfall([
            function (done) {
                console.log("METHOD 1");
                pool.getConnection(function (er, conn) {
                    if (er) {
                        response.json(er);
                    }
                    console.log(request.body);
                    conn.query('select * from LoginInfo where username = ?', request.body.username, function (err, rows) {
                        if (err) {
                            response.status(404);
                            conn.release();
                        }
                        else if (!rows.length) {
                            response.status(404);
                            conn.release();
                        }
                        else {
                            done(null, conn, rows[0])
                        }
                    })
                })
            },
            function (conn, login, call) {
                console.log("METHOD 2");
                conn.query("select * from Employee where employee_id = ? and email = ? ", [login.employee_id, request.body.email], function (err1, rows) {
                    if (err1 || !rows.length) {
                        console.log(err1);
                        response.status(404);
                        response.json(err1);
                        conn.release();
                    } else { // exists in login and employee
                        //var pw = crypt.generatePassword(), sh = crypt.genRandomString(16), pwobj = crypt.sha512(pw,sh);
                        call(null, conn, login);
                    }
                })
            },
            function (conn, loginData, done) {
                console.log("METHOD 3");
                var pw = crypt.generatePassword(), sh = crypt.genRandomString(16), pwobj = crypt.sha512(pw, sh);
                var usr = {password_hash: pwobj.passwordHash, password_salt: pwobj.salt};
                conn.query("update  LoginInfo set ? where username = ?", [usr, request.body.username], function (err2, rows) {
                    if (err2) {
                        console.log(err2);
                    } else {
                        done(null, 200, pw);
                        response.json(200);
                    }
                });
            }
        ], function (err, ok, pw) {
            if (ok == 200) {
                console.log("MAIL");
                sendMailUser(request, request.body.email, pw);
            }
        })
    },

    postNewUserFall: function (req, response) {
        var pw = crypt.generatePassword(), sh = crypt.genRandomString(16), pwobj = crypt.sha512(pw, sh),
            logUsr = {
                username: req.body.username,
                password_hash: pwobj.passwordHash,
                password_salt: pwobj.salt,
                is_admin: req.body.is_admin,
                employee_id: req.body.employee_id
            };
        var emp = {
            name: req.body.name, type_name: req.body.type_name,
            phone_nr: req.body.phone_nr, email: req.body.email, seniority: req.body.seniority
            , responsibility_allowed: req.body.responsibility_allowed, address: req.body.address
            , pers_id: req.body.pers_id
        };
        async.waterfall([
            function (done) {
                pool.getConnection(function (err, conn) {
                    conn.beginTransaction(function () {
                        if (err) {
                            return conn.rollback(function () {
                                console.log(err);
                                throw err;
                            })
                        } else {
                            console.log(req.body.employee_id);
                            conn.query("insert into Employee set ? ", emp, function (err, res) {
                                if (err) {
                                    return conn.rollback(function () {
                                        throw err;
                                    })
                                } else {
                                    done(null, conn, res.insertId); // sends affected id
                                }
                            })
                        }
                    })
                })
            },
            function (conn, id, done) {
                console.log(id);
                var usr = {
                    username: req.body.username, password_hash: pwobj.passwordHash,
                    password_salt: pwobj.salt, is_admin: req.body.is_admin, employee_id: id
                };
                conn.query("insert into LoginInfo set ?", [usr], function (err, res) {
                    if (err) {
                        return conn.rollback(function () {
                            conn.release();
                            done(err, null);
                            throw err;
                        })
                    } else {
                        conn.commit(function () {
                            done(null, req.body.email, 200);
                            conn.release();
                            response.status(200);
                            response.json({melding: "Mail på vei."});
                        })
                    }
                })
            }
        ], function (err, mail, ok) {
            if (!err && ok == 200) {
                sendMailUser(req, mail, pw);
            }
        });
    },
    sendOnlyLogin: function (req, response) {
        var pw = crypt.generatePassword(), sh = crypt.genRandomString(16);
        var pwobj = crypt.sha512(pw, sh);
        var logUsr = {
            username: req.body.username,
            password_hash: pwobj.passwordHash,
            password_salt: pwobj.salt,
            is_admin: req.body.is_admin,
            employee_id: req.body.employee_id
        };

        async.waterfall([
            function (done) {
                pool.getConnection(function (err, conn) {
                    conn.beginTransaction(function () {
                        if (err) {
                            return conn.rollback(function () {
                                console.log(err);
                                throw err;
                            })
                        } else {
                            console.log(req.body.employee_id);
                            conn.query("select email from Employee where employee_id = ?", [req.body.employee_id], function (err, res) {
                                if (err) {
                                    return conn.rollback(function () {
                                        //console.log("ERROR FROM Q1",err);
                                        throw err;
                                    })
                                } else {
                                    //console.log("DONE",res[0].email);
                                    done(null, conn, res[0].email);
                                }
                            })
                        }
                    })
                })
            },
            function (conn, mail, done) {
                //console.log(mail);
                conn.query("insert into LoginInfo set ?", [logUsr, req.body.employee_id], function (err, res) {
                    if (err) {
                        return conn.rollback(function () {
                            conn.release();
                            response.json(err);
                            done(err, null);
                            throw err;
                        })
                    } else {
                        conn.commit(function () {
                            done(null, mail, 200);
                            conn.release();
                            response.json(200);
                        })
                    }
                })
            }
        ], function (err, mail, ok) {
            if (!err && ok == 200) {
                sendMailUser(req, mail, pw);
            } else {
                response.json(err);
            }
        });
    },

    sendTestMail: function (req, res) {
        var mailOptions = {
            from: '"MinVakt" <minvakt.ikkesvar@outlook.com>', //Abigail4prez
            to: req.body.email,
            subject: 'Velkommen til min vakt!',
            text: 'Velkommen til Trondheim og systemet MinVakt.\nGet Trolled to the max!\n http://imgur.com/gallery/3o2pdZB\nMerry christmas.',
        }
        transporter.sendMail(mailOptions, function (err, inf) {
            if (err) {
                return console.log("MAIL ERR: ", err);
            }
            console.log("User info sent to ", req.body.email + "\n" + inf);
            res.json({Message: "Mail sent"});
        })

    },
    nyNodeETest: function (req, res) {
        var obj = {notat: "Villsvin er 90 % vilt og 10% svin"};
        dbMethods.createDone(req, res, "insert into NodeETest set ?", obj);
    },

    changePassword: function (req, res) {
        console.log("changePassword()");

        pool.getConnection(function (er, conn) {
            if (er) {
                res.json(er);
            }
            console.log("query 1")
            conn.query("select * from LoginInfo where username = ?", [req.session.passport.user.username], function (err, rows) {

                if (err) {
                    res.json(404, err);
                    conn.release();
                } else if (!rows.length) {
                    res.json(404, err);
                    conn.release();
                } else {
                    var pwCheckHash = crypt.sha512(req.body.oldpw, rows[0].password_salt);
                    if (pwCheckHash.passwordHash == rows[0].password_hash) {
                        var newSaltHash = crypt.sha512(req.body.newpw, crypt.genRandomString(16));
                    } else {
                        res.status(404);
                        res.json("feil pw");
                        conn.release();
                    }
                    console.log("query 2");
                    conn.query("update LoginInfo set ? where ?", [{
                        password_hash: newSaltHash.passwordHash,
                        password_salt: newSaltHash.salt
                    }, {username: req.session.passport.user.username}], function (err2, rows2) {
                        if (err2) {
                            console.log(err2);
                            res.status(404);
                            res.json(err2);
                            conn.release();
                        } else {
                            res.status(200);
                            res.redirect("/myProfile");
                            conn.release();
                        }
                    })
                }

            })
        })
    },

    acceptRequestWith: function (req, res) {
        console.log("AcceptWith");
        pool.getConnection(function (err, conn) {
            if (err) {
                res.json(err);
                conn.release();
                return;
            }
            console.log("begintransaction");
            conn.beginTransaction(function () {
                if (err) {
                    return conn.rollback(function () {
                        conn.release();
                        console.log(err);
                        res.json(err);
                        throw err;
                    })
                } else {
                    console.log("q1: " + req.body.emp_id1 + " " + req.body.shift_id1);
                    conn.query("Update shift_has_employee set employee_id = ? where shift_id = ?", [req.body.emp_id1, req.body.shift_id1], function (err2,rows) {
                        if (err2 || rows.affectedRows != 1) {
                            return conn.rollback(function () {
                                conn.release();
                                throw err2;
                            })
                        } else {
                            console.log("q2: "  + req.body.emp_id2 + " " + req.body.shift_id2);
                            conn.query("update shift_has_employee set employee_id = ? where shift_id = ?", [req.body.emp_id2, req.body.shift_id2], function (err3, rows2) {
                                if (err3 || rows2.affectedRows != 1) {
                                    return conn.rollback(function () {
                                        conn.release();
                                        throw(err3);
                                    })
                                } else {
                                    conn.release();
                                    conn.commit(function () {
                                        res.status(200);
                                        console.log(rows2);
                                        res.json(rows2);
                                    })
                                }
                            })
                        }
                    })
                }
            })


        })

    }
};