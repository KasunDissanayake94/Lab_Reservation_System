const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestsendSchema = new Schema({
    date : {type:Date,required : true},
    start_time : {type:String,required : true},
    lab : {type:String,required : true},
    request_by : {type:String,required : true},

});


const requestsend =  module.exports = mongoose.model("request_send",requestsendSchema);

module.exports.saverequests_send = function(request_send,callback){
    console.log("Request Send  ",request_send);
    request_send.save(callback);
};
module.exports.serach_all_solve_requests = function(callback){
    requestsend.find(callback);
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
