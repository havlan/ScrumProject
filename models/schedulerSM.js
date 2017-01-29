var poolparty = require('../helpers/db').getPool();
var nodemailer = require('nodemailer');
var async = require('async');

var transporter = require("./regWMail").transporter;
function sendMailShift(rec) {
    var msg = {
        from : "minvakt.ikkesvar@gmail.com",
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
    sendMailOnFree : function(){
        var mailRecp ="";
        async.waterfall([
            function(done){
                poolparty.getConnection(function(err,conn){
                    try {
                        conn.query("select email from available_emp_for_shift group by employee_id order by employee_id limit 3", function (err, rows) { // limit?????
                            conn.release();
                            if (err) {
                                throw err;
                            } else {
                                done(null, rows);
                            }
                        })
                    }catch(error){
                        throw error;
                    }finally{
                        conn.release();
                    }
                })
            },
            function(rows,done){
                for(var i=0;i<rows.length;i++){
                    console.log(rows[i].email);
                    mailRecp += rows[i].email;
                    mailRecp += ",";
                }
                mailRecp = mailRecp.substr(0, mailRecp.length-1);
                done(null, mailRecp,200);
            }
        ], function(err, mail,ok){
            try {
                if (ok == 200) {
                    sendMailShift(mail);
                }
            }catch (mailerr){
                throw mailerr;
            }
        })
    }
};