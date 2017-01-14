var request = require('supertest');
process.env.NODE_ENV = 'test'; // blocks console.log when running tests

describe('=====TESTING=====', function(){
    var server;
    beforeEach(function(){
        server = require('../app');
    });
    afterEach(function(){
        server.close();
    });

    it("GET ROOT", function testSlash(done){ // 200 == ok, when redirecting http status code 302 is res.
        request(server)
            .get('/')
            .expect(200,done); // 302 == found
    });
    it("GET /user",function testPath(done){
        request(server)
            .get('/user')
            .expect(200,done); // 200 == ok
    });
    it("404 everything else",function testPath(done){
        request(server)
            .get('/hest/hestere')
            .expect(404,done); // 404 not found
    });

});