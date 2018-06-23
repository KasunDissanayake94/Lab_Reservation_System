const express = require('express');
const router = express.Router();
const path =  require("path");
const reservation = require('../models/reservation');
const request = require('../models/request');
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
//Do a reservation
router.post("/sreservations",function(req,res){
    if(req.body.lab && req.body.subject && req.body.lecturer && req.body.course){

        const newreservation = new reservation({
            date : req.body.date,
            start_time : req.body.start_time,
            lab : req.body.lab,
            course : req.body.course,
            subject : req.body.subject,
            lecturer : req.body.lecturer
        });
        console.log(newreservation);

        reservation.savereservation(newreservation,function(err,reservation){
            if(err){
                res.json({state:false,msg:"Cannot reserve labs..."});
            }if (reservation){
                res.json({state:true,msg:"Okay..."});
            }
        });
    }else if(req.body.request_by){
        const request_labs = new request({
            date : req.body.date,
            start_time : req.body.start_time,
            lab : req.body.lab,
            request_by : req.body.request_by
        });

        request.saverequests(request_labs,function(err,request_labs){
            console.log(request_labs);
            if(err){
                res.json({state:false,msg:"Failed"});
            }if (request_labs){
                res.json({state:true,msg:"Added"});
            }
        });

    }else{
        //Search reservations for the date and time slot
        const search_reservation = new reservation({
            date : req.body.date,
            start_time : req.body.start_time,

        });
        console.log(reservation);
        reservation.searchReservation(search_reservation,function(err,reservation){
            if(reservation){
                console.log("////");
                console.log(reservation);
                res.json({state:true,msg:"Item found...",dataset:reservation});
            }else{
                res.json({state:false,msg:"No such data..."});
                console.log("data not found");
            }
        });
    }




});
//Search All labs
router.post("/vreservations",function(req,res){
        //Search reservations for the date and time slot
    const search_date = new reservation({
        date : req.body.date,

    });
        reservation.search_labs(search_date,function(err,labs){
            if(labs){
                console.log("Reservations",labs);
                res.json({state:true,msg:"Item found...",labset:labs});
            }else{
                res.json({state:false,msg:"No such data..."});
                console.log("data not found");
            }
        });




});

//get all requests
router.post("/requests",function(req,res){

    request.findRuquests(function (err,requests) {
        if(err) {
            console.log("Requests",requests);
            res.json({state:false,msg:"Item not found"});
        }else if(requests){
            console.log("Requests",requests);
            res.json({state:true,msg:"Item found...",requests:requests});
        }

    });
});
router.post("/requests/solve",function(req,res){
    const delete_req = new request({
        date : req.body.date,
        start_time : req.body.start_time,
        lab : req.body.lab
    });
    request.delete_request(delete_req,function (err,requests) {
        if(err) {
            console.log("waradi");
            res.json({state:false,msg:"Deleted Fialed"});
        }else if(requests){
            res.json({state:true,msg:"Deleted"});
        }

    });
});

router.get('/dashboard', passport.authenticate('jwt', { session: false }),
    function(req, res) {
    console.log(res);
        res.json({user:req.user});
    }
);
//get all users
router.post("/manageusers",function(req,res){

    User.findallusers(function (err,users) {
        if(err) {
            console.log("Requests",users);
            res.json({state:false,msg:"User not found"});
        }else if(users){
            console.log("Requests",users);
            res.json({state:true,msg:"User found...",users:users});
        }

    });
});

module.exports =  router;