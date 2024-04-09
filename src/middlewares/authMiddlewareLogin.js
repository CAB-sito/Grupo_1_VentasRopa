function authMiddlewareLogin(req, res, next){
    if(req.session.usuario != undefined){
        next();
    }else{
        
        res.redirect("/users/login");
    }
}

module.exports = authMiddlewareLogin;