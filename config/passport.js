const  JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {};
const config = require('./database');
const User = require('../models/user');

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secret;

module.exports = function(passport){
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        console.log("error");
        User.findUserbyId({_id: jwt_payload._doc.id}, function(err, user) {
            console.log("error");
                if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
};

