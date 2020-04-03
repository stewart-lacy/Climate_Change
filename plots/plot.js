Plotly.d3.csv('climate_data.csv', function (err, rows) {

  function unpack(rows, key) {
    return rows.map(function (row) { return row[key]; });
  }

  var allCountryNames = unpack(rows, 'country'),
    allYear = unpack(rows, 'year'),
    allEmissions = unpack(rows, 'per_capita_co2_emissions'),
    listofCountries = [],
    currentCountry,
    currentEmissions = [],
    currentYear = [];

  for (var i = 0; i < allCountryNames.length; i++) {
    if (listofCountries.indexOf(allCountryNames[i]) === -1) {
      listofCountries.push(allCountryNames[i]);
    }
  }

  function getCountryData(chosenCountry) {
    currentEmissions = [];
    currentYear = [];
    for (var i = 0; i < allCountryNames.length; i++) {
      if (allCountryNames[i] === chosenCountry) {
        currentEmissions.push(allEmissions[i]);
        currentYear.push(allYear[i]);
      }
    }
  };

  // Default Country Data
  setBubblePlot('Afghanistan');

  function setBubblePlot(chosenCountry) {
    getCountryData(chosenCountry);

    var trace1 = {
      x: currentYear,
      y: currentEmissions,
      mode: 'lines+markers',
      marker: {
        size: 12,
        opacity: 0.5
      }
    };

    var data = [trace1];

    var layout = {
      title: 'Co2 Emissions per Country (1995-2014)',
      xaxis: { title: "Year" },
      yaxis: { title: "Co2 Emissions" },
      height: 400,
      width: 480
    };

    Plotly.newPlot('plot', data, layout);
  };

  var innerContainer = document.querySelector('[data-num="0"'),
    plotEl = innerContainer.querySelector('.plot'),
    countrySelector = innerContainer.querySelector('.countrydata');

  function assignOptions(textArray, selector) {
    for (var i = 0; i < textArray.length; i++) {
      var currentOption = document.createElement('option');
      currentOption.text = textArray[i];
      selector.appendChild(currentOption);
    }
  }

  assignOptions(listofCountries, countrySelector);

  function updateCountry() {
    setBubblePlot(countrySelector.value);
  }

  countrySelector.addEventListener('change', updateCountry, false);
});