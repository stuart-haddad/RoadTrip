var origin1 = new google.maps.LatLng(55.930385, -3.118425);
var origin2 = 'Greenwich, England';
var destinationA = 'Stockholm, Sweden';
var destinationB = new google.maps.LatLng(50.087692, 14.421150);

var service = new google.maps.DistanceMatrixService();
service.getDistanceMatrix(
  {
    origins: [origin1, origin2],
    destinations: [destinationA, destinationB],
    travelMode: 'DRIVING',
    transitOptions: TransitOptions,
    drivingOptions: DrivingOptions,
    unitSystem: UnitSystem,
    avoidHighways: Boolean,
    avoidTolls: Boolean,
  }, callback);

function callback(response, status) {
  if (status == 'OK') {
     var origins = response.originAddresses;
     var destinations = response.destinationAddresses;

     for (var i = 0; i < origins.length; i++) {
       var results = response.rows[i].elements;
       for (var j = 0; j < results.length; j++) {
         var element = results[j];
         var distance = element.distance.text;
         var duration = element.duration.text;
         var from = origins[i];
         var to = destinations[j];
       }
     }
   }
}
