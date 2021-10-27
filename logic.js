// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var queryUrl2 = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";


// Perform a GET request to the query URL.
d3.json(queryUrl).then(function (data) {
  console.log(data.features);
  // Using the features array sent back in the API data, create a GeoJSON layer, and add it to the map.

  // 1.
  // Pass the features to a createFeatures() function:
  createFeatures(data.features);

});

function changeColor(feature) {

  let depth = feature.geometry.coordinates[2];


  if (depth > 90) {
    return '#800026';
  }
  else if (depth > 70) {
    return '#BD0026';
  }
  else if (depth > 50) {
    return '#E31A1C';
  }
  else if (depth > 30) {
    return '#FC4E2A';
  }
  else if (depth > 10) {
    return '#FD8D3C';
  }
  else if (depth > 0) {
    return '#FEB24C';
  }
  else {
    return '#FED976';
  }
}
var plates = new L.LayerGroup()

var queryUrl2 = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";


// Perform a GET request to the query URL.
d3.json(queryUrl).then(function (data) {
  console.log(data.features);
  // Using the features array sent back in the API data, create a GeoJSON layer, and add it to the map.

  // 1.
  // Pass the features to a createFeatures() function:
  createFeatures(data.features);

});

// 2. 
function createFeatures(earthquakeData) {

  // Save the earthquake data in a variable.
  function onEachFeature(feature, layer) {

    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr>Magnitude: ${feature.properties.mag}`)
  }

  let earthquakes = L.geoJson(earthquakeData, {

    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: function(feature) {
      return {
        color: "white",
        weight: 0.3,
        radius: feature.properties.mag * 5,
        fillOpacity: 1,
        fillColor: changeColor(feature)
      }
    },
    onEachFeature: onEachFeature
  })

  // Pass the earthquake data to a createMap() function.
  createMap(earthquakes);
}

// 3.
// createMap() takes the earthquake data and incorporates it into the visualization:
var plates = new L.LayerGroup()

function createMap(earthquakes) {
  // Create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Creat an overlays object.
  var overlayMaps = {
    "Earthquakes": earthquakes,
    "Plates":plates
  };
  
  // Create a new map.
  // Edit the code to add the earthquake data to the layers.
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Create a layer control that contains our baseMaps.
  // Be sure to add an overlay Layer that contains the earthquake GeoJSON.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

//Add Legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [90, 70, 50, 30, 10],
        colors = ['#800026' ,'#BD0026','#E31A1C','#FC4E2A','#FD8D3C','#FEB24C','#FED976'];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);


var queryUrl2 = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";


// Perform a GET request to the query URL.
d3.json(queryUrl2).then(function (data) {
  console.log(data.features);
  // Using the features array sent back in the API data, create a GeoJSON layer, and add it to the map.

  // 1.
  // Pass the features to a createFeatures() function:
  L.geoJson(data, {
    color: "orange",
    weight: 2
  })
  .addTo(plates);
  plates.addTo(myMap)


});
}
