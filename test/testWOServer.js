var crypto = require('../middlewares/cryptoHash');
var chai = require('chai');
var should = chai.should;
var assert = chai.assert;
process.env.NODE_ENV = 'test'; // blocks console.log when running tests


//TEST PWGEN
var pw, salt, hash,sjekk;

before(function(){
    pw = crypto.generatePassword();
    salt = crypto.genRandomString(16);
    hash = crypto.sha512(pw,salt);

});
//var username = req.body.username
//from ditt datt where username = ?"
describe('Test random password gen',function(){
    it('password type',function(){
        assert.isString(pw, 'pw is string');
    });
    it('password length(gen)',function(){
        assert.equal(pw.length,8);
    });
    it('should generate salt',function(){
        assert.lengthOf(salt,16);
    });
    /*it('salt and hash should provide password',function(){
        assert.equal(hash.password_hash,crypto.sha512(pw,hash.salt));
    });*/


});

//TEST PWGEN DONE
