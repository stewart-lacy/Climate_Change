d3.json("data.json").then((data) => {
  console.log(data);
  //  Create the Traces
  var trace1 = {
    x: data.map(row => row.year_2014),
    y: data.map(row => row.country_std),
    text: data.map(row => row.country_std),
    type: "bar",
    orientation: "h"
  };

  //Create the data array for the plot
  var data = [trace1];

  // Define the plot layout
  var layout = {
    title: "2014 CO2 Emissions per Country",
    xaxis: { title: "C02 Emissions" },
    yaxis: { title: "Country" }
  };

  // Plot the chart to a div tag with id "plot"
  Plotly.newPlot("plot", data, layout);
  
  var year_us  = ["1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014"];

  var emissions = [5.18, 5.24, 5.29, 5.26, 5.3,	5.42,	5.27,	5.26,	5.24,	5.26,	5.25,	5.12,	5.13,	4.93,	4.61,	4.69,	4.56,	4.38,	4.38,	4.43];

  var trace2 = {
    x: year_us,
    y: emissions,
    type: "line",
    orientation: "v"
  };

  //Create the data array for the plot
  var data = [trace2];

  // Define the plot layout
  var layout = {
    title: "CO2 Emissions in the United States 1995-2014",
    xaxis: { title: "Year" },
    yaxis: { title: "Emissions" }
  };

  // Plot the chart to a div tag with id "plot"
  Plotly.newPlot("plot2", data, layout);

  var trace3 = {
    x: ['1995', '2000', '2005', '2010', '2014'],
    y: [17.29, 16.03, 16.93, 11.2, 13.54],
    name: 'Qatar',
    type: 'bar'
  };
  
  var trace4 = {
    x: ['1995', '2000', '2005', '2010', '2014'],
    y: [3.68, 5.03, 7.91, 9.84, 9.32],
    name: 'Trinidad and Tobago',
    type: 'bar'
  };

  var trace5 = {
    x: ['1995', '2000', '2005', '2010', '2014'],
    y: [9.18, 7.53, 8.62, 7.99, 6.93],
    name: 'Kuwait',
    type: 'bar'
  };

  var trace6 = {
    x: ['1995', '2000', '2005', '2010', '2014'],
    y: [8.2, 10.12, 7.78, 5.26, 6.34],
    name: 'United Arab Emirates',
    type: 'bar'
  };

  var trace7 = {
    x: ['1995', '2000', '2005', '2010', '2014'],
    y: [7.23, 7.97, 7.23, 6.33, 6.28],
    name: 'Bahrain',
    type: 'bar'
  };
  
  var data = [trace3, trace4, trace5, trace6, trace7];
  
  var layout = {
    barmode: 'stack',
    title: "Countries with Highest CO2 Emissions in 2014",
    xaxis: { title: "Year" },
    yaxis: { title: "Emissions" }};
  
  Plotly.newPlot("plot3", data, layout);

});