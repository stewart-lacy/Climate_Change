console.log("Moo!");

d3.json(`/static/data/data.json`).then((data) => {
  console.log(data);

  var trace = {
    x: ["Qatar", "Trinidad and Tobago", "Kuwait", "United Arab Emirates", "Bahrain"],
    y: [13.54, 9.32, 6.93, 6.34, 6.28],
    type: 'bar'
  };
  
  var data1 = [trace];

  var layout = {
    title: "Countries with Highest CO2 Emissions in 2014",
    xaxis: { title: "Countries" },
    yaxis: { title: "Emissions" }};
  
  Plotly.newPlot("plot", data1, layout);

});

