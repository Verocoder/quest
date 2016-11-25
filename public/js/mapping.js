


var mapping = {
  mapDiv:"",
  map:{},
  currentCoords:{
    latitude:51.505,
    longitude: -0.09
  },


  create: function (mapDiv){
    this.mapDiv=mapDiv;
    this.setPosition();
    this.drawMap();
  },

  drawMap:function(){
    this.map = L.map('mapid').setView([this.currentCoords.latitude,this.currentCoords.longitude], 13);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  },


  setPosition: function (){
    var me = this;
    if (navigator.geolocation) {
      // Get the user's current position
      navigator.geolocation.getCurrentPosition(
        function(position){
          me.coords = position.coords;
        }, function(){
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
  },


  showSomethingAtPosition : function (position, text){
    //L.marker([51.5, -0.09]).addTo(map).bindPopup('manual popup');
    L.marker([position.latitude,position.longitude]).addTo(map).bindPopup(text);
  }
};
