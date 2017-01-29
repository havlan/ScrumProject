/**
 * Created by LittleGpNator on 29.01.2017.
 */






var documentation = require('documentation');
var fs = require('fs');


documentation.build(['/Users/LittleGpNator/WebstormProjects/scrumLords2017/public/frontendJS/approvalAdmin.js'], {}, function (err, res) {
    documentation.formats.md(res, {}, function(err, output) {
        fs.writeFileSync('./approvalAdmin.md', output);
    });
});

