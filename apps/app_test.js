//Maps: AIzaSyB2UB_HscqF9TfPGzj2G1bdbJkXY1s29x0
//Places: AIzaSyB-oHRgiQ7xP9S1Y3VoTtUPLHDQ0EaYI3E

var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map_area'), {
    	center: {lat: -34.397, lng: 150.644},
    	zoom: 8
  	});

// Create the search box and link it to the UI element.
	var input = document.getElementById('start_point');
	var searchBox = new google.maps.places.SearchBox(input);

	var markers = [];
// Listen for the event fired when the user selects a prediction and retrieve
// more details for that place.
  	searchBox.addListener('places_changed', function() {
    	var places = searchBox.getPlaces();

    	if (places.length == 0) {
      		return;
    }

// Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

// For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

// Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
// Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });

}
