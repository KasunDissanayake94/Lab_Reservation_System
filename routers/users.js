const express = require('express');
const router = express.Router();
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