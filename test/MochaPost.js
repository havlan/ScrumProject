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
            .send({"name":"Korporal Lars Dongri Oppholdsnes",
            "phone_nr":99999999,
            "email":"operasjonDagsverk@hotmail.com",
            "seniority": 100,
            "responsibility_allowed":1,
            "type_name":"Sykepleier",
            "address":"Hakkebakkeskogen",
            "pers_id":19191955533,
            "total_hours":0})
            .expect(201)
            .expect('Content-Type', /json/)
            .end(function(err){
                if(err) throw err;
                done();
            })
    });
    it("/postDepartment", function(done){
        request(server)
            .post('/postDepartment')
            .send({"department_name":"Granåsen veteransenter og skiflyverskole."})
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err) {
                if(err) throw err;
                done();
            })
    });
    it("/postType", function(done){
        request(server)
            .post('/postType')
            .send({"name":"Vaskebjørn","rank:":1})
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err){
                if(err) throw err;
                db.revertTest("delete from Type where name = ?",["Vaskebjørn"]);
                done();
            })
    });

    it("/postShift", function(done){
        request(server)
            .post('/postShift')
            .send({"minutes":600, "date":"2019-10-10"})
    })



});