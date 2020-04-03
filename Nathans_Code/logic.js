// Create a map object
var myMap = L.map("map", {
  center: [5,28],
  zoom: 10
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);


//define the year based on the 'defineyear' script

console.log(year);

//add some geoJSON

function popupWindow (feature, layer) {
  L.circle(feature.properties.coordinates, {
    radius: feature.properties.emissions_2014 * 10
  })
  layer.bindPopup("<h1>" + feature.properties.country + "</h1><hr><p>" + feature.properties.emissions_2014 + " tonnes per capita CO2 emissions</p");
};

L.geoJson(emissions, {
  pointToLayer: function(feature,coordinates) {
    let rad = feature.properties.emissions_2014;
    // let rad = trial
    return new L.CircleMarker(coordinates, {
      radius: rad * 5, 
      color: '#FF0000'
    });
  },
  onEachFeature: popupWindow
}).addTo(myMap);

//add functionality to select by year
