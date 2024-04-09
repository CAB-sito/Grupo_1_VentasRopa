function authMiddleware(req, res, next){
    if(req.session.usuario != undefined && req.session.usuario.id_categoria == 2){
        next();
    }else{
        
        res.redirect("/users/login");
    }
}

module.exports = authMiddleware;