var express = require('express');
var app = express();
var router = express.Router();
var es = require('./es');


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


//rest endpoints
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
    res.json(result.hits.hits);
  });
});

app.get("/geobox", function(req, res, next) {
  var tllat = req.param('tlLat');
  var tllong = req.param('tlLong');
  var brlat = req.param('brLat');
  var brlong = req.param('brLong');

  //var hits = es.search(lat, long, distance, res);

  es.getgeobox(tllat, tllong, brlat, brlong).then(function (result) {
    res.json(result.hits.hits);
   });
});

app.get("/imagelookup", function(req, res, next) {
  var catalognumber = req.param('catalognumber');
  //var hits = es.search(lat, long, distance, res);
  es.getimage(catalognumber).then(function (result) {
    res.json(result.hits.hits[0]._source.identifier);
  });
});


//pages
app.get('/', function(request, response) {
  response.render('pages/index');
});
app.get('/about', function(request, response) {
  response.render('pages/about');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
