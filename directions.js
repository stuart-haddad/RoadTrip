function initMap() {
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  // The location of Baton Rouge
  var batonRouge = new google.maps.LatLng(30.4515, -91.1871);
  var oceanBeach = new google.maps.LatLng(37.7683909618184, -122.51089453697205);
  var mapOptions = {
    zoom: 10,
    center: batonRouge,
    mapTypeControl: false,
    disableDefaultUI: true,
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
  new AutocompleteDirectionsHandler(map);
}

function AutocompleteDirectionsHandler(map) {
  this.map = map;
  this.originPlaceId = null;
  this.destinationPlaceId = null;
  this.travelMode = 'DRIVING';
  this.directionsService = new google.maps.DirectionsService;
  this.directionsDisplay = new google.maps.DirectionsRenderer({
    polylineOptions: {
      strokeColor: 'yellow'
    }
  });
  this.directionsDisplay.setMap(map);

  var originInput = document.getElementById('origin-input');
  var destinationInput = document.getElementById('destination-input');
  var modeSelector = document.getElementById('mode-selector');

  var originAutocomplete = new google.maps.places.Autocomplete(originInput);
  // Specify just the place data fields that you need.
  originAutocomplete.setFields(['place_id']);

  var destinationAutocomplete =
      new google.maps.places.Autocomplete(destinationInput);
  // Specify just the place data fields that you need.
  destinationAutocomplete.setFields(['place_id']);

  this.setupClickListener('changemode-walking', 'WALKING');
  this.setupClickListener('changemode-transit', 'TRANSIT');
  this.setupClickListener('changemode-driving', 'DRIVING');

  this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
  this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

  this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
  this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
  //this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
}

// Sets a listener on a radio button to change the filter type on Places
// Autocomplete.
AutocompleteDirectionsHandler.prototype.setupClickListener = function(
    id, mode) {
  var radioButton = document.getElementById(id);
  var me = this;

  radioButton.addEventListener('click', function() {
    me.travelMode = mode;
    me.route();
  });
};

AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(
    autocomplete, mode) {
  var me = this;
  autocomplete.bindTo('bounds', this.map);

  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();

    if (!place.place_id) {
      window.alert('Please select an option from the dropdown list.');
      return;
    }
    if (mode === 'ORIG') {
      me.originPlaceId = place.place_id;
    } else {
      me.destinationPlaceId = place.place_id;
    }
    me.route();
  });
};



AutocompleteDirectionsHandler.prototype.route = function() {
  if (!this.originPlaceId || !this.destinationPlaceId) {
    return;
  }
  var me = this;

  this.directionsService.route(
      {
        origin: {'placeId': this.originPlaceId},
        destination: {'placeId': this.destinationPlaceId},
        travelMode: this.travelMode
      },
      function(response, status) {
        if (status === 'OK') {
          me.directionsDisplay.setDirections(response);
          var dir = me.directionsDisplay.getDirections();

          // //Init RouteBoxer
          // var routeBoxer = new RouteBoxer();
          // var distanceOffPath = 10; // km
          //
          // //Box around the overview path of the first route
          // var path = response.routes[0].overview_path;
          // var boxes = routeBoxer.box(path, distanceOffPath);
          // drawBoxes(boxes);

          var mainRoute = dir.routes[0].legs[0];

          var distance = mainRoute.distance.text;
          document.getElementById('distance').innerHTML = distance;
          var duration = mainRoute.duration.text;
          document.getElementById('duration').innerHTML = duration;
          //Eventually, we will be pulling this data from the form
          var avgGasPrice = 2.305;
          var mpg = document.getElementById("mpg").innerHTML;
          console.log(mpg);
          //Convert Meters to Miles and calculate gas price
          var gasCost = (mainRoute.distance.value * 0.000621371) / mpg * avgGasPrice;
          document.getElementById('costs').innerHTML = "$" + gasCost.toFixed(2);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
};

// Draw the array of boxes as polylines on the map
// function drawBoxes(boxes) {
//   boxpolys = new Array(boxes.length);
//   for (var i = 0; i < boxes.length; i++) {
//     boxpolys[i] = new google.maps.Rectangle({
//       bounds: boxes[i],
//       fillOpacity: 0,
//       strokeOpacity: 1.0,
//       strokeColor: '#000000',
//       strokeWeight: 1,
//       map: map
//     });
//   }
// }
//
// // Clear boxes currently on the map
// function clearBoxes() {
//   if (boxpolys != null) {
//     for (var i = 0; i < boxpolys.length; i++) {
//       boxpolys[i].setMap(null);
//     }
//   }
//   boxpolys = null;
// }

// function searchBounds(bound) {
//    for (var i = 0; i < bound; i++) {
//      (function(i) {
//        setTimeout(function() {
//
//          // Perform search on the bound and save the result
//          performSearch(bound[i]);
//
//          //If the last box
//          if ((bound.length - 1) === i) {
//            addAllMarkers(bound);
//          }
//        }, 400 * i);
//      }(i));
//    }
//  }
//
//
//  function performSearch(bound) {
//    var request = {
//      bounds: bound,
//      keyword: 'bars'
//    };
//
//    currentBound = bound;
//    service.radarSearch(request, callback);
//  }
//
//  // Call back function from the radar search
//
//  function callback(results, status) {
//    if (status !== 'OK') {
//      console.error(status);
//      return;
//    }
//
//    for (var i = 0, result; result = results[i]; i++) {
//      // Go through each result from the search and if the place exist already in our list of places then done push it in to the array
//      if (!placeExists(result.id)) {
//        allPlaces.push(result);
//      }
//    }
//  }
