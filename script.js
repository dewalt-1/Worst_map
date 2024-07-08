function getRoute(end) {
    var start = [currentLocation.longitude, currentLocation.latitude];
    var url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + start.join(',') + ';' + end.join(',') +
        '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        var route = data.routes[0].geometry;
        var geojson = {
            type: 'Feature',
            properties: {},
            geometry: route
        };
        // Assuming a map layer is already defined to display the route
        map.getSource('route').setData(geojson);
        // Display step-by-step directions
        var steps = data.routes[0].legs[0].steps;
        var tripInstructions = document.getElementById('instructions');
        tripInstructions.innerHTML = '';
        steps.forEach((step, i) => {
            tripInstructions.innerHTML += '<li>' + step.maneuver.instruction + '</li>';
        });
    });
}
