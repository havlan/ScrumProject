var mysql = require('mysql');


var pool = mysql.createPool({
    connectionLimit: 27,
    host: 'mysql.stud.iie.ntnu.no',
    user: 'g_scrum04',
    password: 'gBq9reK7',
    database: 'g_scrum04',
    debug: false
});
pool.getConnection(function(err){
    if(err){
        console.log("POOL ERROR");
        throw err;
    }
})
module.exports = pool;
