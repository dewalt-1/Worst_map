/*mapboxgl.accessToken = 'pk.eyJ1IjoiYmVuMTExMTExMSIsImEiOiJjazhocjVwenMwMnh5M2twYzl6cngwNW92In0.RKO2gVTlIs3FYXmoKrzVYQ'; // Replace this with your Mapbox Access Token

// Function to initialize the map at the user's current location
function loadMap(initialCoordinates) {
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/ben1111111/ckazuk0kh054z1io9lc3ehub7',
        center: initialCoordinates, // Use the user's current location as the initial center
        zoom: 15.45
    }); */

    mapboxgl.accessToken = 'pk.eyJ1IjoiYmVuMTExMTExMSIsImEiOiJjazhocjVwenMwMnh5M2twYzl6cngwNW92In0.RKO2gVTlIs3FYXmoKrzVYQ'; // Replace this with your actual Mapbox Access Token

function loadMap(initialCoordinates) {
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/ben1111111/ckazuk0kh054z1io9lc3ehub7',
        center: initialCoordinates,
        zoom: 14
    });

    map.addControl(new mapboxgl.NavigationControl());
    window.map = map;
}

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, { enableHighAccuracy: true });

function successLocation(position) {
    loadMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
    loadMap([-74.5, 40]); // Default location if geolocation fails
}

function submitDestination() {
    var destinationInput = document.getElementById('destination').value;
    if (!destinationInput) {
        alert("Please enter a destination.");
        return;
    }
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(destinationInput)}.json?access_token=${mapboxgl.accessToken}`)
        .then(response => response.json())
        .then(data => {
            if (data.features.length === 0) {
                alert("Destination not found.");
                return;
            }
            var destinationCoords = data.features[0].center;
            getRoute([window.map.getCenter().lng, window.map.getCenter().lat], destinationCoords);
        });
}

function getRoute(start, end) {
    var url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.join(',')};${end.join(',')}?geometries=geojson&steps=true&access_token=${mapboxgl.accessToken}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            var route = data.routes[0].geometry;
            var routeLayer = {
                id: 'route',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        properties: {},
                        geometry: route
                    }
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#3887be',
                    'line-width': 5,
                    'line-opacity': 0.75
                }
            };

            if (map.getSource('route')) {
                map.getSource('route').setData(route);
            } else {
                map.addLayer(routeLayer);
            }

            displayDirections(data.routes[0]);
        });
}

function displayDirections(route) {
    var instructions = route.legs[0].steps.map(step => `<div>${step.maneuver.instruction}</div>`).join('');
    document.getElementById('directions-panel').innerHTML = instructions;
}
