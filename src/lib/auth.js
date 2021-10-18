module.exports = {

    //usuario no logeado
    isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }else{
            return res.redirect('/signin');
        }
    },

    //usuario logeado
    isNotLoggedIn(req,res,next){
        if(req.isAuthenticated()){
            return res.redirect('/profile')
        }else{
            return next();
        }
    }
}