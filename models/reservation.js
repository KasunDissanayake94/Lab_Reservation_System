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
    console.log(reserv);
    const query  = { date: reserv.date, start_time: reserv.start_time } ;
    reservation.findOne(query,callback);

};
// module.exports.findByEmail = function (email,callback) {
//     const query = {email:email};
//     User.findOne(query,callback);
// }
// module.exports.passwordCheck = function (password,hash,callback) {
//
//     bcrypt.compare(password, hash, function(err, res) {
//         if(res == false){
//             callback(null, res);
//         }
//
//         if (res) {
//             callback(null, res);
//         }
//     });
//
//
// }
// module.exports.findUserbyId = function(id,callback){
//     User.findOne(id,callback);
//
//}