var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'https://vero:pipipipi@2f1718a2a36909336e20e24a9e663c7a.us-east-1.aws.found.io:9243',
  log: 'trace'
});
module.exports = {
search: function(lat1,long1, distance1, res) {

//   client.ping({
//   requestTimeout: 30000,
//
//   // undocumented params are appended to the query string
//   hello: "elasticsearch"
// }, function (error) {
//   if (error) {
//     console.error('elasticsearch cluster is down!');
//   } else {
//     console.log('All is well');
//   }
// });


client.search({
  index: 'geodata4',
  type: 'geodata4',
  body: {

 "_source": ["location", "genus"],
    "query": {
        "bool" : {
            "must" : {
                "match_all" : {}
            },
            "filter" : {
                "geo_distance" : {
                    "distance" : "2km",
                    "location" : {
                        "lat" : 51.43798828125,
                        "lon" : -0.10986328125
                    }
                }
            }
        }
    }


  }
}).then(function (resp) {
    var hits = resp.hits.hits;
    return hits;
    res.send(hits);
}, function (err) {
    console.trace(err.message);
});
}
}
