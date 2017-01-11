var assert = require('assert');
var should = require('should');
var supertest = require('supertest');

var server = supertest.agent("http://localhost:3000");




describe("Testing get root (index.html))", function(){
    it("should return home page", function(done){
        server.get('/')
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                res.body.error.should.equal(false);
                done();
            });
    });
});