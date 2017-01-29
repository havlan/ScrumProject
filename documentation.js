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

