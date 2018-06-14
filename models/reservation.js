const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const reservationSchema = new Schema({
    date : {type:Date,required : true},
    start_time : {type:String,required : true},
    lab : {type:String,required : true},
    course : {type:String,required : true},
    subject : {type:String,required : true},
    lecturer : {type:String,required : true},
});


const reservation =  module.exports = mongoose.model("reservation",reservationSchema);

module.exports.savereservation = function(reservation,callback){
    //To hash password
    reservation.save(callback);
};

module.exports.searchReservation = function(reserv,callback){
    const query  = { date: reserv.date, start_time: reserv.start_time } ;
    reservation.find(query,callback);

};

module.exports.search_labs = function(search_date,callback){
    console.log(search_date);
    const query  = { date: search_date.date } ;
    reservation.find(query,callback);

};
