var Mapping = function (mapDiv, listDiv){
  //properties
  this.mapDiv = mapDiv;
  this.listDiv = listDiv;
  this.map = {};
  this.currentData = [];
  this.currentCoords = {
    latitude:51.505,
    longitude: -0.09
  };
  this.markers = [];
  this.markersLayer = new L.FeatureGroup();
  this.homeIcon = new L.icon({
    iconUrl: 'http://www.clker.com/cliparts/5/v/V/e/t/J/simple-red-house-md.png',
     iconSize: [30, 30]
  });

  //setupMethods
  this.drawMap();
  //this.setPosition();

};


Mapping.prototype.drawMap = function(){
  this.map = L.map(this.mapDiv).setView([this.currentCoords.latitude,this.currentCoords.longitude], 12);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(this.map);
};

Mapping.prototype.foundGeo = function (latlng, radius) {
  L.marker(latlng,{draggable:false,title:"You Are Here",icon:this.homeIcon}).addTo(this.map).bindPopup("You are within " + radius + " meters from this point");
  L.circle(latlng, radius).addTo(this.map);
  this.currentCoords = {
    latitude:latlng.lat,
    longitude: latlng.lng
  };
};

Mapping.prototype.moveTo = function (coords){
  this.map.panTo([coords.latitude,coords.longitude]);
};

Mapping.prototype.showSomethingAtPosition = function (position, title, text){
  this.markersLayer.addLayer(L.marker([position.latitude,position.longitude],{draggable:false, title:title}).bindPopup(text));
};


Mapping.prototype.requestDiscoveries = function(coords){
  var url = "/geobox?tlLat=" + coords.getNorthWest().lat + "&tlLong=" + coords.getNorthWest().lng + "&brLat=" + coords.getSouthEast().lat + "&brLong=" + coords.getSouthEast().lng;
  var me = this;
  $.ajax({
    dataType: "json",
    url: url,
    success: function(response){
      me.drawDiscoveries(response);
    }
  });
};
Mapping.prototype.clearOut = function (){
  var listKey = "#"+this.listDiv;
  $(listKey).empty();
  this.map.removeLayer(this.markersLayer);
  this.currentData = [];
  this.markersLayer = new L.FeatureGroup();
};

Mapping.prototype.addThingToList = function (thing){
  var listKey = "#"+this.listDiv;
  $(listKey).append( "<li class='list-group-item'> <a href='http://data.nhm.ac.uk/object/"+ thing.occurrenceID + "' target='_blank'>" + thing.scientificName + "</a></li>" );
};

Mapping.prototype.drawDiscoveries = function (things){
  this.clearOut();
  var listKey = "#"+this.listDiv;
  $(listKey).append( "Discoveries" );
  $(listKey).append( "<ul class='list-group'>" );
  for (var i=0; i<things.length;i++){
    var thing = things[i]._source;
    var text = "<b>" + thing.scientificName + "</b> discovered by " + thing.recordedBy + " in " + thing.year;
    this.currentData.push(thing);
    this.showSomethingAtPosition({latitude:thing.location.lat,longitude:thing.location.lon},thing.scientificName, text);
    this.addThingToList(thing);
  }
  this.markersLayer.addTo(this.map);
  $(listKey).append("</ul>");
};
