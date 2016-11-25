var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'https://vero:pipipipi@2f1718a2a36909336e20e24a9e663c7a.us-east-1.aws.found.io:9243',
  //log: 'trace'
});
module.exports = {
getgeo: function(lat1,long1, distance1, res) {

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


return client.search({
  index: 'geodata4',
  type: 'geodata4',
  body: {

 "_source": ["location", "genus", "scientificName", "year", "nhmid", 'catalogNumber', 'recordedBy', 'dynamicProperties'],
    "query": {
        "bool" : {
            "must" : {
                "match_all" : {}
            },
            "filter" : {
                "geo_distance" : {
                    "distance" : distance1 + "km",
                    "location" : {
                        "lat" : lat1,
                        "lon" : long1
                    }
                }
            }
        }
    }


  }
});
}
}
