var express = require('express');
var indexRouter = express.Router();
var bcrypt = require('bcrypt');

function router(db){
    var user="";
    var pswd="";
    var usuarios = db.collection("usuarios");

    indexRouter.get("/",function(req,res){
      res.render("index", {"user":user});
    });

    indexRouter.post("/:user/:pswd",function(req,res){
      user=req.params.user;
      pswd=req.params.pswd;
      var hash;
      var query = {$and:[{"usuario":{$eq:user}},{"contrasenia":{$eq:pswd}}]};//hay que hacer los querys
      var proyeccion = {"usuario":1,"contrasenia":1,"_id":0};

      db.usuarios.find(query,proyeccion).toArray(function(err, vRestaurantes){
        hash=vRestaurantes[0].contrasenia;
        bcrypt.compare(pswd, hash, function(err, res) {
          // res == true
          if (res) {
            res.render("mapa", {});
          }else{
            res.render("index", {"user":user});
          }
        });//fin bcrypt
      }); // find toarray
    });

    return indexRouter;
}

module.exports = router;
