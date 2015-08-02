var express = require('express');
var userRouter = express.Router();

function user(db){

    userRouter.get("/",function(req,res){

    });

    userRouter.post("/",function(req,res){

    });

    return userRouter;
}

module.exports = user;
