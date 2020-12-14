console.log("working");
// Create the map object with center and zoom level.


//first tile layer
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
      accessToken: API_KEY
  });

// Adding a second tile layer
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});
//create a new variable that takes in the two variables above
//to toggle in between the two styles
let baseMaps = {
  Street: streets,
  Dark: dark
};


// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [30, 30],
	zoom: 2,
	layers: [streets]
})
//control to switch back and forth
L.control.layers(baseMaps).addTo(map);

  let airportData= "https://raw.githubusercontent.com/Jamals211/Mapping_Earthquakes/master/majorAirports.json"

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, 
  {
  onEachFeature: function(feature, layer)
  {
    layer.bindPopup(`<h2>${"Airport Code: "+ feature.properties.faa}<br>${"Airport Name: " + feature.properties.name}</h2>`)
  }
  }).addTo(map)
})








// //GeoJSON data
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

///////////////// Grabbing our GeoJSON data.
// // L.geoJSON(sanFranAirport).addTo(map);



// ////////geoJSON data callback function pointToLayer method
// L.geoJson(sanFranAirport, {
//   // We turn each feature into a marker on the map.
//   pointToLayer: function(feature, latlng) {
//     console.log(feature);
//     ////feature is pulling geometry and prop key/value pair
//     return L.marker(latlng)
//     .bindPopup(`<h2>${feature.properties.name}<br>${feature.properties.city+ ", "+feature.properties.country}</h2>`)
//   }
// }).addTo(map);




// //onEachFeature method to grab geoJSON data
// L.geoJson(sanFranAirport, {
//   onEachFeature: function(feature, layer){
//     console.log(layer)
//     layer.bindPopup(`<h2>${"Airport Code: "+feature.properties.faa}<br>${"Airport Name: "+feature.properties.name} </h2>`)
//   }
// }).addTo(map)







