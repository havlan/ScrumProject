var crypt = require('../middlewares/cryptoHash');
var nodemailer = require('nodemailer');
var async = require('async');
var pool = require('../helpers/db').getPool();
var mailOptions;

function sendMailUser(req, mail, pw) { // sends mail user registers
    mailOptions = {
        from: '"MinVakt" <minvakt.ikkesvar@gmail.com>', //pass: Abigail4prez
        to: mail,
        subject: 'Velkommen til min vakt!',
        text: 'Velkommen til Trondheim og systemet MinVakt.\nMin jobb er å gjøre din hverdag lettere.\n' +
        'Brukernavn: ' + req.body.username + '\nPassord:' + pw + '\nVennligst bytt passord når du har logget inn.'
    };
    try {
        transporter.sendMail(mailOptions, function (err, inf) {
            if (!err) console.log(inf.response);
            else console.log(err);
        })
    }catch(err){
        throw err;
    }
}
module.exports = {
    transporter : nodemailer.createTransport({
        pool: true,
        host: "smtp.gmail.com", // hostname
        secure: true, // TLS requires secureConnection to be false
        port: 465, // port for secure SMTP
        auth: {
            user: 'minvakt.ikkesvar@gmail.com',
            pass: 'Abigail4prez'
        }
    }),
    forgotPwMail: function (request, response) { // email, username
        async.waterfall([
            function (done) {
                pool.getConnection(function (er, conn) {
                    try {
                        if (er) {
                            response.json(er);
                        }
                        console.log(request.body);
                        conn.query('select * from LoginInfo where username = ?', request.body.username, function (err, rows) {
                            console.log(rows);
                            if (err || !rows.length) {
                                response.status(404).json({melding: err});
                                conn.release();
                            }
                            else {
                                done(null, conn, rows[0])
                            }
                        })
                    }catch(zerr){
                        throw zerr;
                    }
                })
            },
            function (conn, login, call) {
                try {
                    conn.query("select * from Employee where employee_id = ? and email = ? ", [login.employee_id, request.body.email], function (err1, rows) {
                        if (err1) {
                            conn.release();
                            response.status(404).json(err1);
                        } else { // exists in login and employee
                            //var pw = crypt.generatePassword(), sh = crypt.genRandomString(16), pwobj = crypt.sha512(pw,sh);
                            call(null, conn, login);
                        }
                    })
                }catch (gerr){
                    throw gerr;
                }
            },
            function (conn, loginData, done) {
                var pw = crypt.generatePassword(), sh = crypt.genRandomString(16), pwobj = crypt.sha512(pw, sh);
                var usr = {password_hash: pwobj.passwordHash, password_salt: pwobj.salt};
                conn.query("update  LoginInfo set ? where username = ?", [usr, request.body.username], function (err2, rows) {
                    if (err2) {
                        response.status(404).json({melding:err});
                    } else {
                        done(null, 200, pw);
                        response.json(200);
                    }
                });
            }
        ], function (err, ok, pw) {
            if (ok == 200) {
                sendMailUser(request, request.body.email, pw);
            }
        })
    },
    confirmShiftChange : function(req,response){
        var pk = req.body.shift_id;
        var pk2 = req.body.employee_id;
        async.waterfall([
        function(done){
            pool.getConnection(function(err,conn){
                try {
                    if (err) {
                        response.status(500).json({melding: "Noe gikk galt."});
                    }
                    conn.query("update shift_has_employee set ? where shift_id = ? and employee_id = ?", [{employee_id: req.body.employee_id2}, pk, pk2], function (err, rows) {
                        if (err) {
                            conn.release();
                            response.status(404).json({melding: "Vakten eksisterer ikke i utgangspunktet."});
                        } else {
                            done(null, req.body.employee_id2, pk2, conn);
                        }
                    })
                }catch(exc){
                    throw exc;
                }
            })

        },
            function(til,fra, conn,cb){
                try {
                    conn.query("select email, name from Employee where employee_id = ?", til, function (err, res) {
                        if (err || !res.length) {
                            conn.release();
                            response.status(404).json({melding: "Ikke funnet fra."});
                        } else {
                            console.log(res);
                            cb(null, res, fra, conn)
                        }
                    })
                }catch(exh){
                    throw exh;
                }

            },
            function(row, from, conn, end){
                try {
                    conn.query("select email, name from Employee where employee_id = ?", from, function (err, resu) {
                        conn.release();
                        if (err) {
                            response.status(404).json({melding: "Fant ikke bytte fra."});
                        } else {
                            end(row, resu);
                            response.status(200).json({melding: "Endinger lagret"});
                        }
                    })
                }catch(ex){
                    throw ex;
                }
            }
        ], function(to,from){
            try {
                var mail1 = {
                    from: '"MinVakt" <minvakt.ikkesvar@gmail.com>', //Abigail4prez
                    to: to[0].email,
                    subject: 'Bytte godkjent.',
                    text: 'Vaktbytte mellom deg og ' + from[0].name + ' er godkjent. Din nye vakt burde dukke opp i kalenderen din.'
                };
                var mail2 = {
                    from: '"MinVakt" <minvakt.ikkesvar@gmail.com>', //Abigail4prez
                    to: from[0].email,
                    subject: 'Bytte godkjent.',
                    text: 'Vaktbytte mellom deg og ' + to[0].name + ' er godkjent. Din vakt burde være fjærnet fra din kalender.'
                };
                transporter.sendMail(mail1, function (err, inf) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(inf.response);
                    }
                });
                transporter.sendMail(mail2, function (err, inf) {
                    console.log(err || inf.response);
                })
            }catch (er){
                throw er;
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
                                response.status(500).json({melding:err});
                                throw err;
                            })
                        } else {
                            console.log(req.body.employee_id);
                            conn.query("select email from Employee where employee_id = ?", [req.body.employee_id], function (err, res) {
                                if (err) {
                                    return conn.rollback(function () {
                                        response.status(500).json({melding:err});
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
    changePassword: function (req, res) {

        pool.getConnection(function (er, conn) {
            if (er) {
                res.json(er);
            }
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

    acceptRequest : function () {
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
                    conn.query("update shift_has_employee set employee_id = ? where shift_id = ?", [req.body.emp_id, req.body.shift_id], function (err3, rows2) {
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


        })
    },

    acceptRequestWith: function (req, res) {
        console.log("AcceptWith");
        pool.getConnection(function (err, conn) {
            if (err) {
                conn.release();
                res.json(err);
                return;
            }
            conn.beginTransaction(function () {
                if (err) {
                    return conn.rollback(function () {
                        conn.release();
                        console.log(err);
                        res.json(err);
                        throw err;
                    })
                } else {
                    conn.query("Update shift_has_employee set employee_id = ? where shift_id = ?", [req.body.emp_id1, req.body.shift_id1], function (err2,rows) {
                        if (err2 || rows.affectedRows != 1) {
                            return conn.rollback(function () {
                                conn.release();
                                throw err2;
                            })
                        } else {
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