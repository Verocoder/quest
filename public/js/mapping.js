var Mapping = function (mapDiv){
  this.mapDiv = mapDiv;
  this.map = {};
  this.currentCoords = {
    latitude:51.505,
    longitude: -0.09
  };
  this.drawMap();
  this.setPosition();

};


Mapping.prototype.drawMap = function(){
  this.map = L.map('mapid').setView([this.currentCoords.latitude,this.currentCoords.longitude], 13);
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
        L.marker([position.coords.latitude,position.coords.longitude],{title:"You are Here",draggable:false}).addTo(me.map).bindPopup("You are here").openPopup();
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

Mapping.prototype.showSomethingAtPosition = function (position, text){
  //L.marker([51.5, -0.09]).addTo(map).bindPopup('manual popup');
  L.marker([position.latitude,position.longitude],{draggable:false}).addTo(this.map).bindPopup(text);
};


Mapping.prototype.requestDiscoveries = function(coords){
  var url = "/geolookup?lat=" + coords.longitude + "&long=" + coords.longitude + "&distance=5";
  var me = this;
  $.ajax({
    dataType: "json",
    url: url,
    success: function(response){
      me.drawDiscoveries(response);
    }
  });
};

Mapping.prototype.drawDiscoveries = function (things){
  // // var things = whatever comes back from calling fraz's API
  // var things = [{
  //   lat:51.505,
  //   lon:-0.09,
  //   name:"butterfly"
  // }];
  for (var i=0; i<things.length;i++){
    var thing = things[i];
    this.showSomethingAtPosition({latitude:thing.lat,longitude:thing.lon},thing.name);
  }
};
