const express = require('express');
const router = express.Router();
const path =  require("path");
const User = require('../models/user');


router.post("/register",function(req,res){


    const newUser = new User({
        username : req.body.username,
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    });

    User.saveUser(newUser,function(err,user){
        if(err){
            res.json({state:false,msg:"Data not inserted to the Database..."});
        }if (user){
            res.json({state:true,msg:"Data inserted to the Database..."});
        }
    });

});
router.post("/login",function(req,res){



    const email = req.body.email;
    const password = req.body.password;
    User.findByEmail(email,function (err,user) {
        if(err) {

        }else if(!user){
            res.json({state:false,msg:"No such user found"});
        }
        else if(user){
            User.passwordCheck(password,user.password,function(err,match){

                if(match){
                    res.json({state:true,msg:"User matched"});
                }else{
                    res.json({state:false,msg:"User doesnot matched"});
                }

            });
        }

    });




});

module.exports =  router;