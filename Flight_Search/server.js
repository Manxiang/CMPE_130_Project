var express = require('express'); //create a express variable
var app = express(); //go through the documentation
var port = process.env.PORT || 8000;
var morgan = require('morgan');
var path = require('path');

app.use(morgan('dev'));   //this statement will be excuted first before anything else
                               //dev is the method we used, morgan documentation
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/index.html'));
});   // this is route

// app.get('/home', function(req, res){
//   res.send('I want to fly');
// });

app.listen(port, function(){
  console.log('Running the server on port ' + port );
});   //port number with console log
    //process.env.PORT -- if there is a specfic port that the environment is using
    //use that, otherwise, use 8000
