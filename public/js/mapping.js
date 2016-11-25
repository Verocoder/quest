var mapping = {
  mapDiv:"",
  currentCoords:{},
  create: function (mapDiv){
    this.mapDiv=mapDiv;
    navigator.geolocation.getCurrentPosition(setPosition, showError);
  },

  drawMap:function(){

    var map = L.map('mapid').setView([coords.latitude,coords.longitude], 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  },


  setPosition: function (){
    if (navigator.geolocation) {
      var showError = function (){
        console.log("error");
      };
      // Get the user's current position
      navigator.geolocation.getCurrentPosition(
        function(position){
          this.coords = positon.coords;
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


  showPosition : function (position){
    console.log(position);
    coords = position.coords;
    var map = L.map('mapid').setView([coords.latitude,coords.longitude], 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker([51.5, -0.09]).addTo(map).bindPopup('manual popup');
    L.marker([coords.latitude,coords.longitude]).addTo(map).bindPopup('Here we are.<br> Lets look for butterflies.').openPopup();
  }
};
