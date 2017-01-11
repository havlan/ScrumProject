var request = require('supertest');

describe('loading express', function(){
    var server;
    beforeEach(function(){
        server = require('../app');
    });
    afterEach(function(){
        server.close();
    });

    it("Responds to /", function testSlash(done){
        request(server)
            .get('/')
            .expect(200,done);
    });
    it("responds to /user",function testPath(done){
        request(server)
            .get('/user')
            .expect(200,done);
    });
    it("404 everything else",function testPath(done){
        request(server)
            .get('/hest/hestere')
            .expect(404,done);
    });
});