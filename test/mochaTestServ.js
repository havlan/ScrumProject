var request = require('supertest');
var server = require('../app');
var should = require('should');


describe('=====TESTING PATHS AND ROUTING OF GET=====', function(){
    before(function(){
        request(server).post('/login').send({
            username:'Alfonso',
            password:'pizza123'
        })
    });


    after(function(done){
        server.close();
        done();
        //console.log("Req error after supertest: ", res.body.error) // undefined bcuz no errs
    });

    it("GET ROOT", function getRoot(done) { // 200 == ok, when redirecting http status code 302 is res.
        request(server)
            .get('/')
            .expect(302, done);
    });
    /*it("GET ROOT with accept setting of json",function getRootJson(done){
        request(server)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type','/json/')
            .expect(200,done);
    });*/

    it("GET /user",function getUser(done){
        request(server)
            .get('/user')
            .expect(302)
            .end(function(req,res){
                res.status.should.equal(302)
                done();
            }); // 200 == ok
    });

    it("GET /user/1", function(done){
        request(server)
            .get('/user/1')
            .expect(302, done);
    });
    it("GET /login", function testGetLogin(done){
        request(server)
            .get('/login')
            .expect(200,done);
    });
    it("GET /getEmployee", function(done){
       request(server)
           .get('/getEmployee')
           //.expect('Content-Type', /json/)
           .expect(302,done);
    });
    it("404 everything else",function testPath(done){
        request(server)
            .get('/hest/hestere')
            .expect(404,done); // 404 not found
    });
    it("GET /getOneEmployee", function(done){
        request(server)
            .get('/getOneEmployee')
            //.expect('Content-Type', 'application/json')
            .expect(302,done);
    });
    it("GET /getType", function(done){
        request(server)
            .get('/getType')
            //.expect('Content-Type', 'application/json')
            .expect(302,done);
    });
    it("GET /getShift", function(done){
        request(server)
            .get('/getShift')
            .expect(302,done);
    });
    it("GET /getShift_has_employee", function(done){
        request(server)
            .get('/getShift_has_employee')
            .expect(302,done);
    });
    it("GET /getRequest", function(done){
        request(server)
            .get('/getRequest')
            .expect(302,done);
    });
    it("GET /getAbsence", function(done){
        request(server)
            .get('/getAbsence')
            .expect(302,done);
    });
    it("GET /getOvertime", function(done){
        request(server)
            .get('/getOvertime')
            .expect(302,done);
    });
    it("GET /getVaktliste", function(done){
        request(server)
            .get('/getVaktliste')
            .expect(302,done);
    });
    it("GET /getEmployeeShiftsToCurrent", function(done){
        request(server)
            .get('/getEmployeeShiftsToCurrent')
            .expect(302,done);
    });
    it("GET /menu", function(done){
        request(server)
            .get('/menu')
            .expect(302,done);
    });
    it("GET /overviewForAdmin", function(done){
        request(server)
            .get('/overviewForAdmin')
            .expect(302,done);
    });
    it("GET /myProfile", function(done){
        request(server)
            .get('/myProfile')
            .expect(302,done);
    });
    it("GET /vaktoversikt", function(done){
        request(server)
            .get('/vaktoversikt')
            .expect(302,done);
    });
    it("GET /calendar", function(done){
        request(server)
            .get('/calendar')
            .expect(302,done);
    });
    it("GET /approvalAdmin", function(done){
        request(server)
            .get('/approvalAdmin')
            .expect(302,done);
    });
    it("GET /frontpageAdmin", function(done){
        request(server)
            .get('/frontpageAdmin')
            .expect(302,done);
    });
    it("GET /getVaktoversiktSite", function(done){
        request(server)
            .get('/getVaktoversiktSite')
            .expect(302,done);
    });
});