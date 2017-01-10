var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');


//use
app.use(bodyParser.json());

//console logging template
require("console-stamp")(console, {
    pattern:"dd/mm/yyyy HH:MM:ss.l",
    metadata:'[' + process.pid + ']',
    colors: {
        stamp : "yellow",
        label: "red",
        metadata: "green"
    }
});


app.get('/',function(req,res){
    res.sendFile(path.join(__dirname + '/index.html'));
    console.log("GET ROOT");
});

app.post('/hest',function(req,res){
    console.log("POST '/hest' # " + ++postNyHest + " " + JSON.stringify(req.body));
    res.type('json');
    res.send("Success");
})

app.listen(3000, function(){
    console.log("Live at 3000");
});
