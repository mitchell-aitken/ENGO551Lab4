// ENGO 551 Lab 4 Javascript File
// Mitchell Aitken - Winter 2024

// initial map with zoom set to Calgary
var map = L.map('mapid').setView([51.0447, -114.0719], 13);

var cartoDarkLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
	maxZoom: 19
}).addTo(map);

// Base Layer - OpenStreetMap
var openStreetMapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
})

// Overlay Layer - Mapbox
var mapboxLayer = L.tileLayer('https://api.mapbox.com/styles/v1/mitchell-aitken/cltansjm600km01ra0noh57wd/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWl0Y2hlbGwtYWl0a2VuIiwiYSI6ImNsdGFqbWtjMjFmeWoyam8wMWV6ZzBqMzAifQ.eTHCGYK4foR8tX8n0Hdj8w', {
    attribution: '© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    tileSize: 512,
    zoomOffset: -1,
});


// layer control to toggle Mapbox layer on and off
var baseMaps = {
    "Dark Basemap OpenStreetMap": cartoDarkLayer,
    "Light Basemap OpenStreetMap": openStreetMapLayer,

};

var overlayMaps = {
    "Traffic Collisions": mapboxLayer
};

L.control.layers(baseMaps, overlayMaps).addTo(map);


// rest of code is same as lab 3

// setting up clustering so markers don't get too crowded
var markerClusterGroup = L.markerClusterGroup();
map.addLayer(markerClusterGroup);

// function to fetch permit data from the city's open data platform
function fetchBuildingPermits(startDate, endDate) {
    // crafting the URL with date filters
    const url = `https://data.calgary.ca/resource/c2es-76ed.geojson?$where=issueddate >= '${startDate}' AND issueddate <= '${endDate}'`;
    // making the request
    return fetch(url)
        .then(response => {
            // checking if we got a good response back
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // parsing the JSON response
            return response.json();
        })
        .then(data => {
            // logging the data for debugging
            console.log('Fetched data:', data);
            return data;
        })
        .catch(error => console.error('Error fetching data: ', error));
}

// function to clear old markers and add new ones based on the date range
function updateMap() {
    // removing any existing markers first
    markerClusterGroup.clearLayers();

    // getting the date range from the input fields
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    // fetching new data and adding it to the map
    fetchBuildingPermits(startDate, endDate)
        .then(data => {
            addBuildingPermitsToMap(data);
        });
}

// function to add markers to the map based on the fetched data
function addBuildingPermitsToMap(data) {
    // explicitly clearing the map again to ensure it's empty
    markerClusterGroup.clearLayers();

    // process each feature in the geojson
    data.features.forEach(feature => {
        if (feature.geometry && feature.geometry.type === 'Point') {
            // setting up the pop-up content for each marker
            var popupContent = `
                <strong>Issued Date:</strong> ${feature.properties.issueddate || 'N/A'}<br>
                <strong>Work Class Group:</strong> ${feature.properties.workclassgroup || 'N/A'}<br>
                <strong>Contractor Name:</strong> ${feature.properties.contractorname || 'N/A'}<br>
                <strong>Community Name:</strong> ${feature.properties.communityname || 'N/A'}<br>
                <strong>Original Address:</strong> ${feature.properties.originaladdress || 'N/A'}
            `;
            // creating the marker
            var marker = L.marker([
                feature.geometry.coordinates[1],
                feature.geometry.coordinates[0]
            ]).bindPopup(popupContent);

            // logging for debugging
            console.log('Adding marker:', marker);

            // adding the marker to the cluster group
            markerClusterGroup.addLayer(marker);
        }
    });
}
