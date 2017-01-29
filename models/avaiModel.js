var async = require('async');
var pool = require('../helpers/db').getPool();

module.exports = {

    /**
     * Inserts multiple new rows in the Availability table.
     * @function
     * @param req
     * @param res
     */
    postAvail : function(req,res){ // TODO delete?
        var okidoki;
        async.waterfall([
            function(done){
                pool.getConnection(function(err,conn){
                    if(err) res.status(500).json({message:"FUCK"});
                  conn.beginTransaction(function(err){
                        if (err) {
                            return conn.rollback(function () {
                                conn.release();
                                console.log(err);
                                throw err;
                            })
                        }else{
                            for(i=0;i<req.body.availarray.length;i++){
                                try {
                                    console.log(req.body.availarray[i]);
                                    conn.query("select * from Availability where day = ? and employee_id = ?", [req.body.availarray[i][0], req.session.passport.id], function (error, res) {
                                        if (error) {
                                            return conn.rollback(function () {
                                                conn.release();
                                                throw error;
                                            })
                                        } else if (res) {
                                            if (res.length > 0) {
                                                conn.query("update Availability set ? where day = ? and employee_id = ?", [{
                                                    day: req.body.availarray[i][0],
                                                    availability: req.body.availarray[i][1],
                                                    employee_id: req.session.passport.id
                                                }, req.body.availarray[i][0], req.session.passport.id], function (herror, res) {
                                                    if (herror) {
                                                        return conn.rollback(function () {
                                                            conn.release();
                                                            throw herror;
                                                        })
                                                    }
                                                })
                                            } else {
                                                conn.query("insert into Availability set ?", [{
                                                    day: req.body.availarray[i][0],
                                                    availability: req.body.availarray[i][1],
                                                    employee_id: req.session.passport.id
                                                }], function (terr, res) {
                                                    if (terr) {
                                                        return conn.rollback(function () {
                                                            conn.release();
                                                            throw terr;
                                                        })
                                                    }
                                                })
                                            }
                                        }
                                    })
                                }catch (fu){
                                    throw fu;
                                }
                            }okidoki = 200;
                            return done(null,okidoki, conn);
                        }
                    })
                })
            }
        ], function(rerror, ok, conn){
            if(ok==200 && !rerror){
                conn.commit(function (gerr) {
                    conn.release();
                    throw gerr;
                })
            }
        })

    }


}