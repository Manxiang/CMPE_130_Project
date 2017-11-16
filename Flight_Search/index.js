var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');

const sGraph = require('node-dijkstra');
const sRoute = new sGraph();   //shortest path

// const aGraph = require('node-all-paths');
// const aRoute = new aGraph();

sRoute.addNode('LosAngeles', {SanFrancisco:1});
sRoute.addNode('SanFrancisco', { LosAngeles:1, SanDiego:2, Sacramento: 4 })
sRoute.addNode('SanDiego', { SanDiego:2, Sacramento:1 })
sRoute.addNode('Sacramento', { SanDiego:1, SanFrancisco:4 })

// aRoute.addNode('LosAngeles', {SanFrancisco:1});
// aRoute.addNode('SanFrancisco', { LosAngeles:1, SanDiego:2, Sacramento: 4 })
// aRoute.addNode('SanDiego', { SanDiego:2, Sacramento:1 })
// aRoute.addNode('Sacramento', { SanDiego:1, SanFrancisco:4 })

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.post('/resultPage', function(req, res){
var start = req.body.start_location;
var end = req.body.end_location;
var shortest = sRoute.path(start, end);
// var allpaths = aRoute.path(start, end);
res.render('resultPage', {data1: shortest});
});

var port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
