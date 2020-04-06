// more or less totally ripped off from https://cartographicperspectives.org/index.php/journal/article/view/cp76-donohue-et-al/1307
$(document).ready(function () {
  var countries;
  var map = L.map("map", {
    center: [0, -30],
    zoom: 2
  });
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-basic",
    accessToken: API_KEY
  }).addTo(map);
  $.getJSON("../static/data/emissions.json").done(function (data) {
      console.log(data);
      var info = processData(data);
      createPropSymbols(info.timestamps, data);
      createLegend(info.min, info.max);
      createSliderUI(info.timestamps);
    })
    .fail(function () {
      alert("There has been a problem loading the data.")
    })
  function processData(data) {
    var timestamps = [];
    var min = Infinity;
    var max = -Infinity;
    for (var feature in data.features) {
      var properties = data.features[feature].properties;
      for (var attribute in properties) {
        if (attribute != 'id' &&
          attribute != 'name' &&
          attribute != 'lat' &&
          attribute != 'lon') {
          if ($.inArray(attribute, timestamps) === -1) {
            timestamps.push(attribute);
          }
          if (properties[attribute] < min) {
            min = properties[attribute];
          }
          if (properties[attribute] > max) {
            max = properties[attribute];
          }
        }
      }
    }
    console.log(timestamps)
    console.log(min)
    console.log(max)
    return {
      timestamps: timestamps,
      min: min,
      max: max
    }
  }
  function createPropSymbols(timestamps, data) {
    countries = L.geoJson(data, {
      pointToLayer: function (feature, coordinates) {
        return L.circleMarker(coordinates, {
          fillColor: "708598",
          color: "537898",
          weight: 1,
          fillOpacity: 0.6
        }).on({
          mouseover: function (e) {
            this.openPopup();
            this.setStyle({ color: "yellow" });
          },
          mouseout: function (e) {
            this.closePopup();
            this.setStyle({ color: "#537898" });
          }
        });
      }
    }).addTo(map);
    updatePropSymbols(timestamps[0]);
  }
  function updatePropSymbols(timestamp) {
    countries.eachLayer(function (layer) {
      var props = layer.feature.properties;
      var radius = calcPropRadius(props[timestamp]);
      var popupContent = "<b>" + String(props[timestamp]) +
        " tonnes CO2 per capita</b><br>" +
        "<i>" + props.name +
        "</i> in <i>" +
        timestamp + "</i>";
      layer.setRadius(radius);
      layer.bindPopup(popupContent, { offset: new L.Point(0, -radius) });
    });
  }
  function calcPropRadius(attributeValue) {
    var scaleFactor = 16;
    var area = attributeValue * scaleFactor;
    return Math.sqrt(area / Math.PI) * 4;
  }
  //creates the map legend
  function createLegend(min, max) {
    if (min < 10) {
      min = 10;
    }
    function roundNumber(inNumber) {
      return (Math.round(inNumber / 10) * 10);
    }
    var legend = L.control({ position: 'bottomright' });
    legend.onAdd = function (map) {
      var legendContainer = L.DomUtil.create("div", "legend");
      var symbolsContainer = L.DomUtil.create("div", "symbolsContainer");
      var classes = [1, roundNumber((max - 1) / 2), roundNumber(max)];
      var legendCircle;
      var lastRadius = 0;
      var currentRadius;
      var margin;
      L.DomEvent.addListener(legendContainer, 'mousedown', function (e) {
        L.DomEvent.stopPropagation(e);
      });
      $(legendContainer).append("<h3 id='legendTitle'>Metric Tons C02<br> per Capita</h3>");
      for (var i = 0; i <= classes.length - 1; i++) {
        legendCircle = L.DomUtil.create("div", "legendCircle");
        currentRadius = calcPropRadius(classes[i]);
        margin = -currentRadius - lastRadius - 2;
        $(legendCircle).attr("style", "width: " + currentRadius * 2 +
          "px; height: " + currentRadius * 2 +
          "px; margin-left: " + margin + "px");
        $(legendCircle).append("<span class='legendValue'>" + classes[i] + "</span>");
        $(symbolsContainer).append(legendCircle);
        lastRadius = currentRadius;
      }
      $(legendContainer).append(symbolsContainer);
      return legendContainer;
    };
    legend.addTo(map);
  } //end createLegend();
  //creates the time slider
  function createSliderUI(timestamps) {
    var sliderControl = L.control({ position: 'bottomleft' });
    sliderControl.onAdd = function (map) {
      var slider = L.DomUtil.create("input", "range-slider");
      L.DomEvent.addListener(slider, 'mousedown', function (e) {
        L.DomEvent.stopPropagation(e);
      });
      $(slider)
        .attr({
          'type': 'range',
          'max': timestamps[timestamps.length - 1],
          'min': timestamps[0],
          'step': 1,
          'value': String(timestamps[0])
        })
        .on('input change', function () {
          updatePropSymbols($(this).val().toString());
          $(".temporal-legend").text(this.value);
        });
      return slider;
    }
    sliderControl.addTo(map)
    createTemporalLegend(timestamps[0]);
  }
  function createTemporalLegend(startTimestamp) {
    var temporalLegend = L.control({ position: 'bottomleft' });
    temporalLegend.onAdd = function (map) {
      var output = L.DomUtil.create("output", "temporal-legend");
      $(output).text(startTimestamp)
      return output;
    }
    temporalLegend.addTo(map);
  }
});