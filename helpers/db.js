var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 27,
    host : 'mysql.stud.iie.ntnu.no',
    user : 'g_scrum04',
    password: 'gBq9reK7',
    database: 'g_scrum04',
    debug : false
});

var connection = pool.getConnection(function(err,connection,res){
    if(err){
        res.status(500);
        res.json({"error": "Error connecting ---> " + err});
        return;
    }
    console.log("Connected to database");
    connection.query('select * from NodeETest', function(err, rows){
        connection.release();
        if(!err){
            console.log(JSON.stringify(rows));
            res.json(rows);
        }else{
            res.status(500);
            res.json({"error":"Error in query --->" + err});
        }
    });


})
