const express = require('express');
const router = express.Router();
const path =  require("path");
const reservation = require('../models/reservation');
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
    }else{
        //Search reservations for the date and time slot
        const search_reservation = new reservation({
            date : req.body.date,
            start_time : req.body.start_time,

        });
        reservation.searchReservation(search_reservation,function(err,reservation){
            if(reservation){
                console.log("////");
                console.log(reservation.date);
                res.json({state:true,msg:"Item found...",date : reservation.date,
                    start_time : reservation.start_time,
                    lab : reservation.lab,
                    course : reservation.course,
                    subject : reservation.subject,
                    lecturer : reservation.lecturer});
            }else{
                res.json({state:false,msg:"No such data..."});
                console.log("data not found");
            }
        });
    }




});

router.get('/dashboard', passport.authenticate('jwt', { session: false }),
    function(req, res) {
    console.log(res);
        res.json({user:req.user});
    }
);

module.exports =  router;