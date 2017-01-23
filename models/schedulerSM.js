var dbMethods = require('../helpers/db');
var poolparty = require('../helpers/db').getPool();
var queries = require('../middlewares/dbQ1');
var crypt = require('../middlewares/cryptoHash');
var nodemailer = require('nodemailer');

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


module.exports = {
    sendAvailableShiftMail: function () {
        poolparty.getConnection(function (err, connection) {
            if (err) {
                console.log("ERROR in cron: " + err);
            }
            console.log('Connected to database');
            connection.query("SELECT id FROM available_shift_emp GROUP BY id", function (err, rows) {
                if (!err) {
                    console.log("query 1 ok");
                    var indeks = 0;
                    for (var i = 0; i < rows.length; i++) {
                        console.log(rows[indeks].id);
                        connection.query("SELECT * FROM available_shift_emp WHERE id = " + rows[indeks].id, function (err2, rows2) {
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