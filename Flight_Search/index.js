var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');

/**********************************************************************
***********************************************************************
*********************Algorithm********************************/
const sGraph = require('node-dijkstra');
const sRoute = new sGraph();   //shortest path

sRoute.addNode('LosAngeles', {SanFrancisco:1});
sRoute.addNode('SanFrancisco', { LosAngeles:1, SanDiego:2, Sacramento: 4 })
sRoute.addNode('SanDiego', { Sacramento:1 })
sRoute.addNode('Sacramento', { SanDiego:1, SanFrancisco:4 })
//*******************END**************************************

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
var all = ["LosAngeles","SanFrancisco", "SanDiego", "Sacramento"]; //add cities to this string array
var start = req.body.start_location;
var end = req.body.end_location;
var distance = req.body.distance;

var destination = [];

var shortest = sRoute.path(start, end, {cost: true, trim: true});

var i;
for(i = 0; i < all.length; i++ ){
  var short_temp = sRoute.path(start, all[i], {cost: true});
  if(short_temp.cost <= distance & short_temp.cost != 0){
      destination.push(all[i]);
  }
}  //get all possible destination

res.render('resultPage', {data1: shortest, data2: distance, data3: destination, start: start, end: end});
});   //post result to resultpage


//*******************************************GET PORT**********************
var port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
