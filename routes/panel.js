var express = require('express');
var panelRouter = express.Router();

var app = require('express')();
var http = require('http').Server(app);

function panel(db){
    var restaurantes = db.collection("restaurantes");

    panelRouter.get("/:docnum",function(req,res){
      var query = {"docnum":{$eq:parseInt(req.params.docnum)}};
      var proy = {"_id":0,"properties":1};
      restaurantes.find(query,proy).toArray(function(err, vRestaurantes){
          if(err){
              res.status(500).json({"error":err});
          }else{
              res.status(200).json({"restaurantes":vRestaurantes});
          }
      }); // find toarray
    });

    panelRouter.get("/Voto/:voto",function(req,res){

    });


    return panelRouter;
}

module.exports = panel;
