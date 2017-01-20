/**
 * Created by LittleGpNator on 18.01.2017.
 */
var chai = require('chai');
var expect = require('chai').expect;
var myprofile = require('/forntendJS/myProfile');
var htmlTable = require('./public/view/myProfile.html');

//npm install

//Eksemple med chai:
describe('Mocha test FroEnd  #tjabe', function () {
    it('test ..... in ...... file',function () {
        expect("Dette").to.equal('Dette');
        expect("Dette").to.not.equal('Dettte');
        expect("Dette").to.be.a('string');
        expect("Dette").to.not.be.a('number');
        expect("Dette").to.contain('Det');
        expect(1).to.be.ok;
        expect(false).to.not.be.ok;
        expect(undefined).to.not.be.ok;
        expect(null).to.not.be.ok;
        expect(true).to.be.true;
        expect(1).to.not.be.true;
    }),
    it('minProfile', function () {
        var returned = myprofile.buildHtmlTable('#histTable');
        expect();
    })
});

