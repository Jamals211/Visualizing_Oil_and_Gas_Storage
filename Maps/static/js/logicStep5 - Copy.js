console.log("working");
// Create the map object with center and zoom level.




// First Tile Layer
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Second Tile Layer
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id:'mapbox.streets',
      accessToken: API_KEY
  });

// Third Tile Layer
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
  accessToken: API_KEY
});

// Variable to toggle between layers
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets,
  "Dark":dark
};

//create an overlay
let earthquakes=new L.layerGroup()

// Create the Tectonic Plates layer for our map.
let TectonicPlates  = new L.layerGroup();

// Overlay visible at all times
let overlays = {
  "Earthquakes": earthquakes
  };

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [39.5, -98.5],
	zoom: 3,
	layers: [streets]
})

// Style function:get radius
function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}

// This function determines the color of the circle based on the magnitude of the earthquake
function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
  }

// Set earthquake of zero to 1
function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
}

// Control to toggle between tiles and add overlays 
L.control.layers(baseMaps,overlays).addTo(map);

earthquakeURL="States.json"

d3.json(earthquakeURL).then (function(data)
{
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, 
    {
//use pointToLayer to create circleMarkers
    pointToLayer: function(feature, latlng) 
    {
        return L.circleMarker(latlng);
    },
        style: styleInfo,
        onEachFeature: function(feature,layer)
        {
            layer.bindPopup(`${"{Production(mBBL)} :"+feature.data.Production}<br><hr>${"State: "+feature.data.PlaceName}`)
        }
    }).addTo(earthquakes);
    earthquakes.addTo(map)

// Create Legend
var legend = L.control({position: 'bottomright'});
legend.onAdd = function () 
{
    var div = L.DomUtil.create('div', 'info legend')
    const magnitudes = [0, 1, 2, 3, 4, 5];
    const colors = 
    [
      "#98ee00",
      "#d4ee00",
      "#eecc00",
      "#ee9c00",
      "#ea822c",
      "#ea2c2c"
    ];
        labels = [];
    // Looping through intervals to generate a label with a colored square for each interval.
   for (var i = 0; i < magnitudes.length; i++) 
   {
    console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
  return div;
};

// Add legend to map
legend.addTo(map);
});