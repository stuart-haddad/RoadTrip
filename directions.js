function initMap() {
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  // The location of Baton Rouge
  var batonRouge = new google.maps.LatLng(30.4515, -91.1871);
  var oceanBeach = new google.maps.LatLng(37.7683909618184, -122.51089453697205);
  var mapOptions = {
    zoom: 10,
    center: batonRouge,
    styles: [
       {elementType: 'geometry', stylers: [{color: '#A5E39E'}]},
       {elementType: 'labels.text.stroke', stylers: [{color: '#123C5C'}]},
       {elementType: 'labels.text.fill', stylers: [{color: '#9ca5b3'}]},
       {
         featureType: 'administrative.locality',
         elementType: 'labels.text.fill',
         stylers: [{color: '#9ca5b3'}]
       },
       {
         featureType: 'poi',
         elementType: 'labels.text.fill',
         stylers: [{color: '#9ca5b3'}]
       },
       {
         featureType: 'poi.park',
         elementType: 'geometry',
         stylers: [{color: '#72CD68'}]
       },
       {
         featureType: 'poi.park',
         elementType: 'labels.text.fill',
         stylers: [{color: '#9ca5b3'}]
       },
       {
         featureType: 'road',
         elementType: 'geometry',
         stylers: [{color: '#D6F3D3'}]
       },
       {
         featureType: 'road',
         elementType: 'geometry.stroke',
         stylers: [{color: '#D6F3D3'}]
       },
       {
         featureType: 'road',
         elementType: 'labels.text.fill',
         stylers: [{color: '#9ca5b3'}]
       },
       {
         featureType: 'road.highway',
         elementType: 'geometry',
         stylers: [{color: '#D6F3D3'}]
       },
       {
         featureType: 'road.highway',
         elementType: 'geometry.stroke',
         stylers: [{color: '#D6F3D3'}]
       },
       {
         featureType: 'road.highway',
         elementType: 'labels.text.fill',
         stylers: [{color: '#9ca5b3'}]
       },
       {
         featureType: 'transit',
         elementType: 'geometry',
         stylers: [{color: '4E738F'}]
       },
       {
         featureType: 'transit.station',
         elementType: 'labels.text.fill',
         stylers: [{color: '#9ca5b3'}]
       },
       {
         featureType: 'water',
         elementType: 'geometry',
         stylers: [{color: '#57B8CF'}]
       },
       {
         featureType: 'water',
         elementType: 'labels.text.fill',
         stylers: [{color: '#515c6d'}]
       },
       {
         featureType: 'water',
         elementType: 'labels.text.stroke',
         stylers: [{color: '#17263c'}]
       }
     ]};
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  var marker = new google.maps.Marker({position: batonRouge, map: map});
  directionsDisplay.setMap(map);
}

function calcRoute() {
  document.getElementById('map').display;
  var start = document.getElementById('start').value; //batonRouge
  var end = document.getElementById('end').value; //oceanBeach
  alert("Start Point: " + start);
  var request = {
    origin: start,
    destination: end,
    travelMode: 'DRIVING'
  };
  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
    }
    else {
      alert(status);
    }
  });
}
