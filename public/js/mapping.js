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
  this.markersLayer = new L.LayerGroup();

  //setupMethods
  this.drawMap();
  this.setPosition();

};


Mapping.prototype.drawMap = function(){
  this.map = L.map('mapid').setView([this.currentCoords.latitude,this.currentCoords.longitude], 11);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(this.map);
};


Mapping.prototype.setPosition = function (){
  var me = this;
  if (navigator.geolocation) {
    // Get the user's current position
    navigator.geolocation.getCurrentPosition(
      function(position){
        me.coords = position.coords;
        me.moveTo(position.coords);
        me.showSomethingAtPosition(position.coords,"You are here", "You are here");
      },
      function(){
        alert("your browser doesn't support geolocation, defaulting to London");
        this.coords = {
          latitude:51.505,
          longitude: -0.09
        };
      }
    );
  } else {
    alert('Geolocation is not supported in your browser');
  }
};

Mapping.prototype.moveTo = function (coords){
  this.map.panTo([coords.latitude,coords.longitude]);
};

Mapping.prototype.showSomethingAtPosition = function (position, title, text){
  //L.marker([51.5, -0.09]).addTo(map).bindPopup('manual popup');
  this.markers.push(L.marker([position.latitude,position.longitude],{draggable:false, title:title}).addTo(this.map).bindPopup(text));
};


Mapping.prototype.requestDiscoveries = function(coords){
  var url = "/geolookup?lat=" + coords.lat + "&long=" + coords.lng + "&distance=5";
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
  //this.map.removeLayer(this.markersLayer);
  $("#"+this.listid).empty();
  for (var m; m<this.markers.length;m++){
    this.map.removeLayer(this.markers[m]);
  }
  console.log(this.markers);
  this.currentData = [];
};

Mapping.prototype.addThingToList = function (thing){
  // write a jquery call to get the div with the list in and fill it with info
  $("#"+this.listid).append( "<li class='list-group-item'>" + thing.scientificName +"</li>" );
};

Mapping.prototype.drawDiscoveries = function (things){
  this.clearOut();
  $("#"+this.listid).append( "<ul class='list-group'>" );
  for (var i=0; i<things.length;i++){
    var thing = things[i]._source;
    var text = "<b>" + thing.scientificName + "</b> discovered by " + thing.recordedBy + " in " + thing.year;
    this.currentData.push(thing);
    this.showSomethingAtPosition({latitude:thing.location.lat,longitude:thing.location.lon},thing.scientificName, text);
    this.addThingToList(thing);
  }
  $("#"+this.listid).append("</ul>");
};
