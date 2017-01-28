var request = require('supertest');
var server = require('../app');
var should = require('should');
var db = require('../helpers/db');


describe('=====TESTING PATHS AND ROUTING OF POST METHODS=====', function() {
    before(function () {
        request(server)
            .post('/login')
            .send({
            "username": "Abigail",
            "password": "pizza123"
        }).expect(200);
    });

    it("/postUser", function(done){
        request(server)
            .post('/postUser')
            .set("Content-Type","application/json")
            .send({"name":"Korporal Lars Dongri Oppholdsnes",
            "phone_nr":99999999,
            "email":"operasjonDagsverk@hotmail.com",
            "seniority": 100,
            "responsibility_allowed":1,
            "type_name":"Sykepleier",
            "address":"Hakkebakkeskogen",
            "pers_id":19191955533,
            "total_hours":0})
            .expect(302)
            //.expect('Content-Type', /json/)
            .end(function(err){
                if(err) throw err;
                done();
            })
    });
    it("/postDepartment", function(done){
        request(server)
            .post('/postDepartment')
            .set("Content-Type","application/json")
            .send({"department_name":"Granåsen veteransenter og skiflyverskole."})
            .expect(302)
            .expect('Content-Type', /json/)
            .end(function (err,res) {
                res.status.should.equal(302);
                done();
            })
    });
    it("/postType", function(done){
        request(server)
            .post('/postType')
            .set("Content-Type","application/json")
            .send({"name":"Vaskebjørn","rank:":1})
            .expect(302)
            //.expect('Content-Type', /json/)
            .end(function(err){
                if(err) throw err;
                db.revertTest("delete from Type where name = ?",["Vaskebjørn"]);
                done();
            })
    });




});