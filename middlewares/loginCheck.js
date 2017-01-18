



//middleware methods for loggedin checks
module.exports = {
    isLoggedIn: function (req, res, next) {
        console.log("\n\nISLOGGEDINMETHOD\n\n");
        if (req.session.passport.user) {
            return next();
        } else {
            res.redirect('/login');
        }
    },
    isAdminIn : function(req,res,next){
        if(!typeof req.session.passport.user == 'undefined' && req.session.passport.user.is_admin == 1){
            return next();
        }else{
            res.redirect('/login');
        }
    }
}