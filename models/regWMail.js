var dbMethods = require('../helpers/db');
var pool =require('../helpers/db').getPool();
var queries = require('../middlewares/dbQ1');
var crypt = require('../middlewares/cryptoHash');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
        ciphers:'SSLv3'
    },
    auth: {
        user: 'minvakt.ikkesvar@outlook.com',
        pass: 'Abigail4prez'
    }
});




module.exports = {
    postNewUserQuery : function(req,res){ // fuck
        var emp = {name:req.body.name, type_name:req.body.type_name,
            phone_nr: req.body.phone_nr, email:req.body.email, seniority: req.body.seniority
            , responsibility_allowed : req.body.responsibility_allowed, address: req.body.address
            ,pers_id : req.body.pers_id};
        var pw = crypt.generatePassword(), sh = crypt.genRandomString(16);
        var pwobj = crypt.sha512(pw,sh);
        var out = [];
        var mailOptions = {
            from: '"MinVakt" <minvakt.ikkesvar@outlook.com>', //Abigail4prez
            to: req.body.email,
            subject: 'Velkommen til min vakt!',
            text: 'Velkommen til Trondheim og systemet MinVakt.\nMin jobb er å gjøre din hverdag lettere.\n' +
             'Brukernavn: ' + req.body.username + '\nPassord: ' + pw + '\nVennligst bytt passord når du har logget inn.'

        };
        pool.getConnection(function(err,con){
            con.beginTransaction(function(err){
                if(err){
                    return con.rollback(function(){
                        con.release();
                        throw err;
                    })
                }
                console.log("Connected");
                con.query("insert into Employee set ?", emp, function(err,res1, done){
                    if(err){
                        return con.rollback(function(){
                            con.release();
                            throw err;
                        })
                    }
                    out.push(res1[0]);
                    var usr = { username: req.body.username, password_hash : pwobj.passwordHash,
                        password_salt: pwobj.salt, is_admin:req.body.is_admin, employee_id:res1.insertId
                    };
                    con.query("insert into LoginInfo set ?", usr, function(err,res2){
                        if(err){
                            return con.rollback(function(){
                                con.release();
                                throw err;
                            })
                        }
                        out.push(res2[0]);
                        transporter.sendMail(mailOptions, function (err,inf) {
                            if(err){
                                return con.rollback(function(){
                                    con.release();
                                    throw err;
                                })
                            }else{
                                console.log(inf.response);
                                if(res) {
                                    console.log("res exists", res.socket.TCP);

                                    con.commit(function (err) {
                                        res.json({Message: "Bruker lagd."}) // bruk
                                    })
                                }else{
                                    console.log("res does not exist")
                                }
                                //return out;
                            }
                        });
                    })
                })
            })
        })
    },


    sendValidRegistration : function(req,res){ // først employee -> LoginInfo
        //check if user exists
        //req.body contains user
        queries.getLoginInfo(req,res, function(err, next){
            if(!err) {
                res.json({error: "User exists"});
            }else{
                next();
            }
        });
        var loginId;
        var emp = {name:req.body.name, type_name:req.body.type_name,
        phone_nr: req.body.phone_nr, email:req.body.email, seniority: req.body.seniority
        , responsibility_allowed : req.body.responsibility_allowed, address: req.body.address
        ,pers_id : req.body.pers_id};
        var pw = crypt.generatePassword(), sh = crypt.genRandomString(16);
        var pwobj = crypt.sha512(pw,sh);
        dbMethods.createInQDone(req,res,"insert into Employee set ?", emp, function(req,res){
            var usr = { username: req.body.username, password_hash : pwobj.passwordHash,
                password_salt: pwobj.salt, is_admin:req.body.is_admin, employee_id:req.body.insertId
            };
            dbMethods.createInQDone(req,res,"insert into LoginInfo set ?", usr, function(req,res){
                transporter.sendMail(mailOptions, function(err,inf){
                    if(err){
                        return console.log("MAIL ERR: ", err);
                    }
                    console.log("User info sent to ", req.body.email);
                });
            });
        })


    },

    sendTestMail : function(req,res){
        var mailOptions = {
            from: '"MinVakt" <minvakt.ikkesvar@outlook.com>', //Abigail4prez
            to: req.body.email,
            subject: 'Velkommen til min vakt!',
            text: 'Velkommen til Trondheim og systemet MinVakt.\nGet Trolled to the max!\n http://imgur.com/gallery/3o2pdZB\nMerry christmas.',
        }
        transporter.sendMail(mailOptions, function(err,inf){
            if(err){
                return console.log("MAIL ERR: ", err);
            }
            console.log("User info sent to ", req.body.email + "\n" + inf);
            res.json({Message: "Mail sent"});
        })

    },
    nyNodeETest : function(req,res){
        var obj = {notat:"Villsvin er 90 % vilt og 10% svin"};
        dbMethods.createDone(req,res,"insert into NodeETest set ?", obj);
    }

};
