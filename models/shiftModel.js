var pool = require('../helpers/db').getPool();

module.exports = {
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
                        var sql = "INSERT INTO Shift (minutes, date, department_id, type_name) values ?";

                        conn.query(sql, [req.body.shifts], function (error, res2) {
                            if (error) {
                                return conn.rollback(function () {
                                    conn.release();
                                    console.log(error);
                                })
                            } else {

                                var shiftIds = [];
                                var indeks = 0;
                                for (var i = 0; i < res2.affectedRows; i++) {
                                    if (req.body.shiftemps[i][0] != 0) {
                                        shiftIds[indeks] = new Array(2);
                                        shiftIds[indeks][0] = res2.insertId + i;
                                        shiftIds[indeks][1] = req.body.shiftemps[i][0];
                                        indeks++;
                                    }
                                }

                                conn.query("insert into shift_has_employee (shift_id,employee_id) values ?", [shiftIds], function (error, res3) {
                                    if (error) {
                                        return conn.rollback(function () {
                                            conn.release();
                                        })
                                    } else {
                                        conn.commit(function (gerr) {
                                            conn.release();
                                            if (gerr) {
                                                console.log(gerr);
                                            }
                                        })
                                    }
                                })
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