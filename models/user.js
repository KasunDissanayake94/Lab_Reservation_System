const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username : {type:String , required : true},
    name : { type : String , required : true},
    type : { type :String , required : true},
    password : { type : String , required : true}
});


module.exports = mongoose.model("User",userSchema);
module.exports.saveUser = function(newUser , callback){
    //To hash password
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;

            if(err) throw err;
            newUser.save(callback);
        });
    });
};