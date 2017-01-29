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

documentation.build(['./public/frontendJS/frontpageAdmin.js'], {}, function (err, res) {
    documentation.formats.md(res, {}, function(err, output) {
        fs.writeFileSync('./documentation/frontpageAdmin.md', output);
    });
});

/*
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
documentation.build(['./middlewares/cryptoHash.js'], {}, function (err, res) {
    documentation.formats.md(res, {}, function(err, output) {
        fs.writeFileSync('./documentation/cryptoHash.md', output);
    });
});
documentation.build(['./models/regWMail.js'], {}, function (err, res) {
    documentation.formats.md(res, {}, function(err, output) {
        fs.writeFileSync('./documentation/regWMail.md', output);
    });
});
documentation.build(['./models/shiftModel.js'], {}, function (err, res) {
    documentation.formats.md(res, {}, function(err, output) {
        fs.writeFileSync('./documentation/shiftModel.md', output);
    });
});
documentation.build(['./helpers/db.js'], {}, function (err, res) {
    documentation.formats.md(res, {}, function(err, output) {
        fs.writeFileSync('./documentation/db.md', output);
    });
});
documentation.build(['./controllers/configRoute.js'], {}, function (err, res) {
    documentation.formats.md(res, {}, function(err, output) {
        fs.writeFileSync('./documentation/configRoute.md', output);
    });
});

documentation.build(['./public/frontendJS/availability.js'], {}, function (err, res) {
    documentation.formats.md(res, {}, function(err, output) {
        fs.writeFileSync('./documentation/availability.md', output);
    });
});