const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const requestSchema = new Schema({
    date : {type:Date,required : true},
    start_time : {type:String,required : true},
    lab : {type:String,required : true},
    request_by : {type:String,required : true},

});


const requests =  module.exports = mongoose.model("request",requestSchema);

module.exports.saverequests = function(requests,callback){
    requests.save(callback);
};
module.exports.findRuquests = function(callback){
    requests.find(callback);
};
module.exports.delete_request = function(req,callback){
    console.log(requests.date);
    const query  = { date: req.date, start_time: req.start_time ,lab:req.lab } ;
    requests.remove(query,callback);

};
//
// module.exports.searchReservation = function(reserv,callback){
//     const query  = { date: reserv.date, start_time: reserv.start_time } ;
//     reservation.find(query,callback);
//
// };
//
// module.exports.search_labs = function(search_date,callback){
//     console.log(search_date);
//     const query  = { date: search_date.date } ;
//     reservation.find(query,callback);
//
// };
