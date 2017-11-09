var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

const Graph = require('node-dijkstra');
const route = new Graph();   //shortest path algorithm

var start = 'SanFrancisco';
var end = 'LosAngeles';

route.addNode('SanFrancisco', { SanDiago:1 });
route.addNode('SanDiago', { SanFrancisco:1, Sacramento:2, LosAngeles:4 });
route.addNode('Sacramento', { SanDiago:2, LosAngeles:1 });
route.addNode('LosAngeles', { Sacramento:1, SanDiago:4 });   //added node

// Create the application.
var app = express();

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// CORS Support
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost/meanapp');
mongoose.connection.once('open', function() {

  // Load the models.
  app.models = require('./models/index');

  // Load the routes.
  var routes = require('./routes');
  _.each(routes, function(controller, route) {
    app.use(route, controller(app, route));
  });

  console.log('Listening on port 8000...');
  console.log(route.path(start, end));
  app.listen(8000);
});
