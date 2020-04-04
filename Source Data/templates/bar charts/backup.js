d3.json(`data.json`).then((data) => {
  //console.log(data);

  var trace = {
    x: ["Qatar", "Trinidad and Tobago", "Kuwait", "United Arab Emirates", "Bahrain"],
    y: [13.54, 9.32, 6.93, 6.34, 6.28],
    marker: {
      color: ['rgb(255,238,122)', 'rgb(232,204,111)', 'rgb(255,215,135)', 
      'rgb(232,179,111)', 'rgb(255,177,122)']
    },
    type: 'bar'
  };
  
  var data1 = [trace]

  var layout = {
    title: "Countries with Highest Co2 Emissions (per capita) in 2014",
    xaxis: { title: "Countries" },
    yaxis: { title: "Co2 Emissions" }};
  
  Plotly.newPlot("plot", data1, layout);

});