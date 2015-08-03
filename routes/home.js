var express = require('express');
var homeRouter = express.Router();

function home(db){

    homeRouter.get("/",function(req,res){
      res.render("home",{});
    });

    homeRouter.post("/",function(req,res){

    });

    return homeRouter;
}

module.exports = home;
