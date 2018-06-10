const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username : {type:String,required : true},
    name : {type:String,required : true},
    email : {type:String,required : true},
    password : {type:String,required : true}
});


const User =  module.exports = mongoose.model("User",userSchema);

module.exports.saveUser = function(newUser,callback){
    //To hash password
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};
module.exports.findByEmail = function (email,callback) {
    const query = {email:email};
    User.findOne(query,callback);    
}
module.exports.passwordCheck = function (password,hash,callback) {

    bcrypt.compare(password, hash, function(err, res) {
        if(res == false){
            callback(null, res);
        }

        if (res) {
            callback(null, res);
        }
    });


}
module.exports.findUserbyId = function(id,callback){
    User.findOne(id,callback);

}