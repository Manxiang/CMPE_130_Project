var express = require('express');
var app = express();
var path = require("path");


app.set('port', process.env.PORT || 3000);  //localhost:3000

// app.get('/', function(req,res){
//   res.send('Express Works');
// }); //whenever it access /, it will output the message

app.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/home', function(req,res){
  res.sendFile(__dirname + '/home.html');
});

app.listen(app.get('port'), function(){
  console.log('Express started press Ctrl-c to terminate');
}); //will output to the git bash, once the code is running successfully
