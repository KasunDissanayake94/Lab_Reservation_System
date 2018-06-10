const express  = require('express');
const path =  require("path");
const user = require('./routers/users');
const mongoose =require('mongoose');
const config = require('./config/database');
//Convert html body to json
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const connection = mongoose.connect(config.database);
if(connection){
    console.log("Databse Connected...");
}else{
    console.log("Database not connected...");
}

const app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
//Initialize passport
require('./config/passport')(passport);


app.use('/',user);

app.listen(3000,function(){
    console.log("Listening to port 3000");
});