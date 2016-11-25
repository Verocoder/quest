var express = require('express');
var app = express();
var router = express.Router();
var es = require('./es');


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get("/geolookup", function(req, res, next) {
  var lat = req.param('lat');
  var long = req.param('long');
  var distance = req.param('distance');
  var data= [];
  //var hits = es.search(lat, long, distance, res);

  es.getgeo(lat, long, distance).then(function (result) {
  //  for (var i = 0, len = result.hits.hits.length; i < len; i++) {
  //    data.add(result.hits.hits[i].result.source);
//  someFn(arr[i]);
//}

//result.hits.hits.forEach(function(entry) {
//data.add(entry.source)

//});
//console.log(data);
    res.json(result.hits.hits) });





});

app.get('/nicky', function(request, response) {
  response.render('pages/nicky');
});

app.get('/david', function(request, response) {
  response.render('pages/david');
});
//app.get('/nicky', function(request, response) {
//  response.render('pages/nicky');
//});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
