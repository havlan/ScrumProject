var dbMethods = require('../helpers/db');
var poolparty = require('../helpers/db').getPool();
var queries = require('../middlewares/dbQ1');
var crypt = require('../middlewares/cryptoHash');
var nodemailer = require('nodemailer');
var promise = require('bluebird');
var async = require('async');

var transporter = nodemailer.createTransport({
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
function sendMailShift(rec) {
    var msg = {
        from : "minvakt.ikkesvar@outlook.com",
        to: rec,
        subject : "Ledige vakter",
        text: "Hei!\nDet er flere ledige vakter tilgjengelig i din personlige kalender.\nDet eneste du trenger å gjøre er å logge inn, husk at en god kollega hjelper de som ikke kan.\nMvh MinVakt."
    }
    transporter.sendMail(msg, function (err, inf) {
        if (!err) console.log(inf.response);
        else console.log(err);
    })
}


module.exports = {
    sendMailOnFree : function(requ,resp){
        var mailRecp ="'";
        async.waterfall([
            function(done){
                poolparty.getConnection(function(err,conn){
                    conn.query("select email from available_emp_for_shift group by employee_id order by employee_id limit 3", function(err,rows){ // limit?????
                        conn.release();
                        if(err || !rows.length){
                            resp.status(404).json({melding:"Fikk ikke send mail angående ledig vakt."});
                        }else{
                            done(null,rows);
                        }
                    })
                })
            },
            function(rows,done){
                for(var i=0;i<rows.length;i++){
                    console.log(rows[i].email);
                    mailRecp += rows[i].email;
                    mailRecp += ",";
                }
                mailRecp = mailRecp.substr(0, mailRecp.length-1);
                //console.log(mailRecp, " ready for mail.");
                done(null, mailRecp,200);
            }
        ], function(err, mail,ok){
            if(ok == 200){
                resp.status(200).json({melding: "Eposter sendt!"});
                sendMailShift(mail);
            }else{
                resp.json(500).json({melding: "Eposter ikke sendt."});
            }

        })
    },



    sendAvailableShiftMail: function () {
        poolparty.getConnection(function (err, connection) {
            if (err) {
                console.log("ERROR in cron: " + err);
            }
            console.log('Connected to database');
            connection.query("SELECT id FROM available_shift_emp GROUP BY id", function (err, rows) { // available shift i stedet.
                if (!err) {
                    console.log("query 1 ok");
                    var indeks = 0;
                    for (var i = 0; i < rows.length; i++) {
                        console.log(rows[indeks].id);
                        connection.query("SELECT * FROM available_shift_emp WHERE id = ? limit 3" ,rows[indeks].id, function (err2, rows2) {
                                if (!err2 && rows.length > 0) {
                                    console.log("query 2, " + indeks + " ok");

                                    var mailList = [];
                                    var antall = 3;

                                    if(rows2.length < antall){
                                        antall = rows2.length;
                                    }

                                    for(var j = 0; j < antall; j++){
                                        mailList[j] = rows2[j].email;
                                    }

                                    console.log(mailList);
                                    var mailText = "SkiftID: " + rows2[0].id + "\nRank: " + rows2[0].title + "\nDato og tid: " + rows2[0].start + "\nSted: " + rows2[0].department_name;

                                    /*var mailOptions = {
                                        from: '"MinVakt" <minvakt.ikkesvar@outlook.com>',
                                        to: mailList,
                                        subject: 'Skift ledig!',
                                        text: mailText
                                    }
                                    transporter.sendMail(mailOptions, function (err, inf) {
                                        console.log("Sending mails");
                                        if (err) {
                                            return console.log("MAIL ERR: ", err);
                                        }

                                        console.log("Shift mail sent to " + mailList + "\n" + inf);
                                    });*/
                                }
                                else {
                                    console.log("ERROR in cron, query 2, " + indeks + ": " + err2);
                                }
                            }
                        )
                        indeks++;
                    }
                    connection.release(); // Legg tilbake i pool
                } else {
                    console.log("ERROR in cron, query 1: " + err);
                }
            })
            ;
        });
    }
}
;