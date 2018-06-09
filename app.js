const express = require('express');
const mongoose = require('mongoose');
const app = express();
var bodyParser = require('body-parser')

const config = require('./config/database');

const connection = mongoose.connect(config.database);
if(connection){
    console.log("Databse Connected...");
}else{
    console.log("Database not connected...");
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


//Call back
app.get("/",function(req,res){
    res.send("Hello World")

});

app.get("/users",function(req,res){
    res.send("Hello Users")

});
//Create server using express

app.listen(3000,function(){
    console.log("Listening to port 3000");
})