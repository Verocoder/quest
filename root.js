var express = require('express');
var app = express();
var es = require('./es');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get("/geolookup", function(req, res) {
  var lat = req.param('lat');
  var long = req.param('long');
  var distance = req.param('distance');
  var hits = es.search(lat, long, distance, res);



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
