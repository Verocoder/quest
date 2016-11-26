# Quest

Quest is an interactive map/game/thing using open data from the Natural History Museum (NHM)Data Portal.

Things you can do...

  - see youself on a map and the artefacts/collections around you
  - TODO - claim collections and add to your visited places of interest
  -TODO - more cool stuff we haven't written yet

You can also:
  - Import and save files from GitHub, Dropbox, Google Drive and One Drive
  - Drag and drop files into Dillinger
  - Export documents as Markdown, HTML and PDF


> This app was written for Over The Air Hackathon 2016, solving the The Natural History Open Data Challenge. Many thanks go to the organisers and sponsors of this event!


### Tech

We've used a number of cool things...:

* [Elasticsearch] - geosearching!
* [NHM data portal] - source of data and follow-on searching
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Heroku] - Cloud computing babeh!
* [jQuery] - Naturally!
* [leaflet.js] - Holy mapping javascript, Batman!
* [vis.js] - timeline


### Routes and APIs

#### Get items
get local items using lat, long and distance.
URL encoded 'get'
http://localhost:5000/geolookup?lat=1&long=2&distance=3




### Installation

Quest requires an elasticsearch source...


```sh
$ cd quest
$ /FILE/logstash/bin -f ./geo8.conf
```

and the Node?




### Development

Want to contribute? Great!

Git yourself up!



### Todos

 - more stuff here

License
----

Apache



   [Elasticsearch]: <search>
 [NHM data portal]: <http://data.nhm.ac.uk>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [leaflet.js]: <http://leafletjs.com>
   [vis.js]: <http://visjs.com>
[Heroku]: <http://heroku.com>
