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
    reservation.save(callback);
};

module.exports.searchReservation = function(reserv,callback){
    const query  = { date: reserv.date, start_time: reserv.start_time } ;
    reservation.find(query,callback);

};

module.exports.search_labs = function(search_date,callback){
    const query  = { date: search_date.date } ;
    reservation.find(query,callback);

};
module.exports.searchlab = function(search_lab,callback){
    const query  = { lab: search_lab.lab } ;
    reservation.find(query,callback);

};
module.exports.searchmonthlab = function(month,callback){
    reservation.aggregate([
        {$project: {month: {$month: '$date'},lab :'$lab'}},
        {$match: {month: parseInt(month)}},
    ],callback);

};
module.exports.deletereservation = function(delete_request,callback){
    const query  = { date: delete_request.date, start_time: delete_request.start_time ,lab:delete_request.lab } ;
    reservation.remove(query,callback);

};
