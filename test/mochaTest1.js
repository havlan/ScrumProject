var assert = require('mocha');

describe ('Array', function(){
    describe('#indexof', function(){
        it('Should return -1 when not present', function(){
            assert.equal(-1, [1,2,3].indexOf(4));
        });
    });
});