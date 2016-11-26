var Mapping = function (mapDiv, listDiv, timelineDiv){
  //properties
  this.mapDiv = mapDiv;
  this.listDiv = listDiv;
  this.timelineDiv = timelineDiv;
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
  this.drawMap();
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
  var timelineDiv = "#"+this.timelineDiv;
  $(listKey).empty();
  $(timelineDiv).empty();
  this.map.removeLayer(this.markersLayer);
  this.currentData = [];
  this.markersLayer = new L.FeatureGroup();
};




Mapping.prototype.addThingToList = function (thing){
  var listKey = "#"+this.listDiv;
  $("button").button().unbind().click(function(){
          var name = this.value;
          var url = "/imagelookup?catalognumber="+this.id;
          var me = this;
          $.ajax({
            dataType: "json",
            url: url,
            success: function(response){
              var link = response + "thumbnail";
                //alert(response + "thumbnail");



  // here asign the image to the modal when the user click the enlarge link
     $('#imagemodal').modal('show');
     $("#imagepreview").attr("src",link)
     document.getElementById("myModalLabel").innerHTML = name;



            }
          });
      });

  $(listKey).append( "<li class='list-group-item'> <a href='http://data.nhm.ac.uk/object/"+ thing.occurrenceID + "' target='_blank'>" + thing.scientificName + "</a><button type='button' class='btn btn-primary btn-sm' id=" + thing.nhmid + " value=" + thing.scientificName + " data-toggle='modal' data-target=''#myModal'>Image</button></li>" );
};

Mapping.prototype.drawDiscoveries = function (things){
  this.clearOut();
  var listKey = "#"+this.listDiv;
  $(listKey).append( "<ul class='list-group'>" );
  for (var i=0; i<things.length;i++){
    var thing = things[i]._source;
    var text = "<b>" + thing.scientificName + "</b> discovered by " + thing.recordedBy + " in " + thing.year;
    this.currentData.push(thing);
    this.showSomethingAtPosition({latitude:thing.location.lat,longitude:thing.location.lon},thing.scientificName, text);
    this.addThingToList(thing);
  }
  this.markersLayer.addTo(this.map);
  this.drawTimeline();
  $(listKey).append("</ul>");
};

Mapping.prototype.drawTimeline = function (){
  var ev = [];
  var firstYear = 2016;
  var lastYear = 1000;
  var numYears = 0;
  for (var i=0; i<this.currentData.length; i++){
    var thing = this.currentData[i];
    if (thing.year){
      if (thing.year<firstYear){
        firstYear = thing.year;
      }
      if (thing.year>lastYear){
        lastYear = thing.year;
      }
      var item = {
        id:i,
        content:thing.scientificName,
        start: thing.year + '-01-01'
      };
      ev.push(item);
    }
  }
  numYears = lastYear - firstYear;
  if (numYears>0){

  var container = document.getElementById(this.timelineDiv);

  // Create a DataSet (allows two way data-binding)
  var items = new vis.DataSet(ev);

  // Configuration for the Timeline
  var options = {};

  // Create a Timeline
  var timeline = new vis.Timeline(container, items, options);
    // $(timelineDiv).jqtimeline({
    //   events : ev,
    //   numYears:numYears,
    //   startYear:firstYear,
    //   click:function(e,event){
    //     alert(event.name);
    //   }
    //});
  }
};
