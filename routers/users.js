const express = require('express');
const router = express.Router();
const path =  require("path");
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const passport = require('passport');


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
    console.log("back");
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
                    const token = jwt.sign(user.toJSON(), config.secret,{expiresIn:86400});
                    res.json(
                        {
                            state:true,msg:"User matched",
                            token: "JWT " + token,
                            user : {
                                id:user._id,
                                name:user.name,
                                username:user.username,
                                email:user.email
                            }
                        });
                    console.log(token);
                }else{
                    res.json({state:false,msg:"User doesnot matched"});
                }

            });
        }

    });




});
router.get('/dashboard', passport.authenticate('jwt', { session: false }),
    function(req, res) {
    console.log(res);
        res.json({user:req.user});
    }
);

module.exports =  router;