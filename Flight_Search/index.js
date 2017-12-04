var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
/**********************************************************************
***********************************************************************
*********************MongoDB********************************/
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, {
  useMongoClient: true
});

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: {type: String},
  password: {type: String}
});

var User = mongoose.model('User', userSchema); //model created
/**********************************************************************
***********************************************************************
*********************Algorithm********************************/
const sGraph = require('node-dijkstra');
const sRoute = new sGraph();   //shortest path

const cGraph = require('node-dijkstra');
const cRoute = new cGraph(); // price based

// sRoute.addNode('LosAngeles', {SanFrancisco:100, Tahoe: 300});
// sRoute.addNode('SanFrancisco', { LosAngeles:100, SanDiego:200, Sacramento: 400, Hawaii: 150})
// sRoute.addNode('SanDiego', { Sacramento:100})
// sRoute.addNode('Sacramento', { SanDiego:100, SanFrancisco:400, Hawaii:400})
//
// cRoute.addNode('LosAngeles', {SanFrancisco:230, Tahoe: 120});
// cRoute.addNode('SanFrancisco', { LosAngeles:340, SanDiego:560, Sacramento: 480, Hawaii: 500 })
// cRoute.addNode('SanDiego', { Sacramento:390})
// cRoute.addNode('Sacramento', { SanDiego:120, SanFrancisco:460, Hawaii: 700})
  sRoute.addNode('SanFrancisco', {LosAngeles:30, LongBeach: 40, Malibu: 90, Sacramento: 420, Hawaii: 700});
  sRoute.addNode('LosAngeles', {SanFrancisco:30, Irvine:50, Oakland: 34});
  sRoute.addNode('Malibu', {LosAngeles: 130, SanFrancisco: 60});
  sRoute.addNode('Irvine', {Pasadena: 300});
  sRoute.addNode('Oakland', {SanMateo: 50, PalmSprings: 90, SanDiego:200});
  sRoute.addNode('Pasadena', {SanFrancisco: 80});
  sRoute.addNode('SanDiego', {SanJose: 50, Tahoe: 123});
  sRoute.addNode('SanJose', {PalmSprings: 60, Riverside: 42, SantaRosa: 53, Sacramento: 69, Malibu: 430, SanFrancisco: 96});
  sRoute.addNode('Riverside', {Anaheim: 102, SanJose: 42});
  sRoute.addNode('SantaRosa', {SantaCruz:205, SantaMonica: 430});
  sRoute.addNode('Sacramento', {SantaClara: 50, SantaBarbara: 49, SanFrancisco: 140});

  cRoute.addNode('SanFrancisco', {LosAngeles:671, LongBeach: 900, Malibu: 890, Sacramento: 1032, Hawaii: 3000});
  cRoute.addNode('LosAngeles', {SanFrancisco:671, Irvine:350, Oakland: 731});
  cRoute.addNode('Malibu', {LosAngeles: 130, SanFrancisco: 231});
  cRoute.addNode('Irvine', {Pasadena: 1200});
  cRoute.addNode('Oakland', {SanMateo: 321, PalmSprings: 459, SanDiego:340});
  cRoute.addNode('Pasadena', {SanFrancisco: 680});
  cRoute.addNode('SanDiego', {SanJose: 350, Tahoe: 1034});
  cRoute.addNode('SanJose', {PalmSprings: 60, Riverside: 900, SantaRosa: 123, Sacramento: 523, Malibu: 938, SanFrancisco: 430});
  cRoute.addNode('Riverside', {Anaheim: 1020, SanJose: 900});
  cRoute.addNode('SantaRosa', {SantaCruz:321, SantaMonica: 430});
  cRoute.addNode('Sacramento', {SantaClara: 500, SantaBarbara: 1002, SanFrancisco: 943});
// sRoute.addNode('A', {B:5, D:2, C:3});
// sRoute.addNode('B', {D:4});
// sRoute.addNode('D', {A:2, B: 4});
// sRoute.addNode('C', {D:2});
//*******************END**************************************
var all = ["LosAngeles","SanFrancisco", "SanDiego", "Sacramento","Malibu","Irvine", "Oakland", "Pasadena", "SanJose", "Riverside", "SantaRosa", "LongBeach", "SantaCruz", "SantaMonica", "SantaClara", "SantaBarbara", "Pasadena", "SanMateo", "Anaheim"]; //add cities to this string array
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(express.static('views'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//****************************************GET/POST REQUEST******************

app.get('/', function (req, res) {
    res.render('home');
}); //get information from home page


app.post('/resultPage', function(req, res){
var start = req.body.start_location;
var end = req.body.end_location;
var distance = req.body.distance;
var price = req.body.price;
var destination = [];


var shortest = sRoute.path(start, end, {cost: true, trim: true});
var pricebased = cRoute.path(start, end, {cost: true}); //I only want the price
// var allpath = sRoute.allpath(start, end, {cost: true});
// console.log(allpath);
var i;
for(i = 0; i < all.length; i++ ){
  var short_temp = sRoute.path(start, all[i], {cost: true}); //all is the location array
  if(short_temp.cost <= distance & short_temp.cost != 0){
      destination.push(all[i]);
  }
}  //get all possible destination for distance based

for(i = 0; i < destination.length; i++){
    loca = sRoute.path(start, destination[i], {cost: true, trim: true});
}

for(i = 0; i < all.length; i++ ){
  var short_temp = cRoute.path(start, all[i], {cost: true});
  if(short_temp.cost <= price & short_temp.cost != 0){
      destination.push(all[i]);  //price based destination
  }
}  //get all possible destination for price based

res.render('resultPage', {price: price, Nprice: pricebased, data1: shortest, data2: distance, data3: destination, start: start, end: end});
});   //post result to resultpage

app.post('/register', function(req, res){
    var new_name = req.body.newuser_name;
    var new_pass = req.body.newpassword;

    var newuser = new User();
    newuser.username = new_name;
    newuser.password = new_pass;
    newuser.save(function(err, savedUser){
      var err;
      if(err){
        err = true;
      }
      else{
        err = false;
      }
      res.render('register', {data: err});
    })
});

app.post('/user', function(req, res){
  var name = req.body.user_name;
  var pass = req.body.password;
  User.findOne({username: name, password: pass}, function(err, user) {
    var err;
    if(err){
      console.log(err);
    }

    if(!user){
      err = true;
    }

    else{
      err = false;
    }
    res.render('user', {check: err, name: name});
  })

});
//*******************************************GET PORT**********************

// var allpath = sRoute.allpath('A', 'D', {cost: true});
// console.log(allpath);
//
// var shortest = sRoute.path('A', 'B', {cost: true});
// console.log(shortest);

var port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
