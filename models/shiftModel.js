var pool = require('../helpers/db').getPool();

module.exports = {

    /**
     * Inserts new shifts in the database.
     * Also binds the shifts to employees if chosen(second query).
     * @function
     * @param req
     * @param res
     */
    createNewShifts : function (req,res) {
        try {
            pool.getConnection(function (err, conn) {
                if (err) res.status(500).json({message: "error"});

                conn.on('error', function(err) {
                    console.log('Query error: ' + err);
                });

                conn.beginTransaction(function (err2) {
                    if (err2) {
                        return conn.rollback(function () {
                            conn.release();
                            console.log(err2);
                        })
                    } else {
                        conn.query("INSERT INTO Shift (minutes, date, department_id, type_name) values (?,?,?,?)", [req.body.minutes, req.body.date, req.body.department_id, req.body.type_name], function (error, res2) {
                            if (error) {
                                return conn.rollback(function () {
                                    conn.release();
                                    console.log(error);
                                })
                            } else {
                                if(req.body.emp != 0){
                                    conn.query("insert into shift_has_employee (shift_id,employee_id) values (?,?)", [res2.insertId, req.body.emp], function (error, res3) {
                                        if (error) {
                                            return conn.rollback(function () {
                                                conn.release();
                                            })
                                        } else {
                                            conn.commit(function (gerr) {
                                                conn.release();
                                                res.status(200).json(res3);
                                                if (gerr) {
                                                    console.log(gerr);
                                                }
                                            })
                                        }
                                    })
                                } else {
                                    conn.commit(function (yerr) {
                                        conn.release();
                                        res.status(200).json(res2);
                                        if (yerr) {
                                            console.log(yerr);
                                        }
                                    })
                                }
                            }
                        })
                    }
                })
            })
        } catch (terr){
            throw terr;
        }
    }
}