var express = require('express');
var mapaRouter = express.Router();

var app = require('express')();
var http = require('http').Server(app);

function mapa(db){
    var restaurantes = db.collection("restaurantes");

    mapaRouter.get("/",function(req,res){
      res.render("mapa", {});
    });

    mapaRouter.get("/mapa",function(req,res){
      var query = {};
      restaurantes.find(query).toArray(function(err, vRestaurantes){
          if(err){
              res.status(500).json({"error":err});
          }else{
              res.status(200).json({"restaurantes":vRestaurantes});
          }
      }); // find toarray
    });

    return mapaRouter;
}

module.exports = mapa;
