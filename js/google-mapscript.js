
function initialize() {

        var map = new google.maps.Map(document.getElementById('map-canvas'), {
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: new google.maps.LatLng(38.438472,-78.873727),
          zoom: 15,
        });

        var infoWindow = new google.maps.InfoWindow();

        var directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('results'));

        var directionsService = new google.maps.DirectionsService();

        var layer = new google.maps.FusionTablesLayer({
          query: {
            select: '\'Current Location\'',
            from: '16NP68tY2xoaRXoJGWo7OJ9WyJKd8vrptlP30HtE'
          },
          map: map,
          options: {
            suppressInfoWindows: true
          }
        });

        // Add a click listener to the layer that creates a new infowindow
        // with directions text input
        google.maps.event.addListener(layer, 'click', function(e) {
          infoWindow.setContent(e.infoWindowHtml +
              '<br><label>Get Directions to here:</label> ' +
              '<input type="text" id="begin">' +
              '<input type="button" value="go" id="go">');
          infoWindow.setPosition(e.latLng);
          infoWindow.open(map);

          google.maps.event.addDomListener(document.getElementById('go'),
              'click', function() {
                var start = document.getElementById('begin').value;

                var request = {
                  origin: start,
                  destination: e.latLng,
                  travelMode: google.maps.DirectionsTravelMode.WALKING
                };
                directionsService.route(request, function(response, status) {
                  if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                  } else {
                    window.alert('Error generating directions: ' + status);
                  }
                });
          });
        });
      }

      google.maps.event.addDomListener(window, 'load', initialize);