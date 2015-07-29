var express = require('express');
var mapaRouter = express.Router();

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

function mapa(db){

    mapaRouter.get("/",function(req,res){
      res.render("mapa", {});
    });

    return mapaRouter;
}

module.exports = mapa;
