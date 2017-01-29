/**
 * Created by LittleGpNator on 29.01.2017.
 */






var documentation = require('documentation');
var fs = require('fs');


documentation.build(['./public/frontendJS/approvalAdmin.js'], {}, function (err, res) {
    documentation.formats.md(res, {}, function(err, output) {
        fs.writeFileSync('./documentation/approvalAdmin.md', output);
    });
});

documentation.build(['./public/frontendJS/overviewAdmin.js'], {}, function (err, res) {
    documentation.formats.md(res, {}, function(err, output) {
        fs.writeFileSync('./documentation/overviewAdmin.md', output);
    });
});


documentation.build(['./public/frontendJS/login.js'], {}, function (err, res) {
    documentation.formats.md(res, {}, function(err, output) {
        fs.writeFileSync('./documentation/login.md', output);
    });
});

documentation.build(['./public/frontendJS/myProfile.js'], {}, function (err, res) {
    documentation.formats.md(res, {}, function(err, output) {
        fs.writeFileSync('./documentation/myProfile.md', output);
    });
});

documentation.build(['./public/frontendJS/overviewEmp.js'], {}, function (err, res) {
    documentation.formats.md(res, {}, function(err, output) {
        fs.writeFileSync('./documentation/overviewEmp.md', output);
    });
});


documentation.build(['./public/frontendJS/shiftOverview.js'], {}, function (err, res) {
    documentation.formats.md(res, {}, function(err, output) {
        fs.writeFileSync('./documentation/shiftOverview.md', output);
    });
});

documentation.build(['./public/frontendJS/frontpageAdmin.js'], {}, function (err, res) {
    documentation.formats.md(res, {}, function(err, output) {
        fs.writeFileSync('./documentation/frontpageAdmin.md', output);
    });
});