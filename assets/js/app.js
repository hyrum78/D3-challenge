// @TODO: YOUR CODE HERE!

//chart sizing
var svgWidth = 1000;
var svgHeight = 500;
var margin = {top: 40, right: 40, bottom: 80, left: 80};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//SVG wrapper
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  //import csv
  d3.csv("../assets/data/data.csv").then(function(csvData) {
    csvData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
  });

  //scale functions
  var xLinearScale = d3.scaleLinear().range([0, width]);
  var yLinearScale = d3.scaleLinear().range([height, 0]);
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  var xMin;
  var xMax;
  var yMin;
  var yMax;
  
  xMin = d3.min(csvData, function(data) {
      return data.healthcare;
  });
  
  xMax = d3.max(csvData, function(data) {
      return data.healthcare;
  });
  
  yMin = d3.min(csvData, function(data) {
      return data.poverty;
  });
  
  yMax = d3.max(csvData, function(data) {
      return data.poverty;
  });
  
  xLinearScale.domain([xMin, xMax]);
  yLinearScale.domain([yMin, yMax]);

  //append axes
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

  //circles
  var circlesPlot = chartGroup.selectAll("circle")
    .data(csvData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.healthcare +1.45))
    .attr("cy", d => yLinearScale(d.poverty +0.3))
    .attr("r", "8.5")
    .attr("fill", "#5F9EA0")
    .attr("opacity", .5)
  
  //labels
  chartGroup.append("text")
    .style("font-size", "9px")
    .selectAll("tspan")
    .data(csvData)
    .enter()
    .append("tspan")
    .attr("x", function(data) {
        return xLinearScale(data.healthcare +1.3);
    })
    .attr("y", function(data) {
        return yLinearScale(data.poverty +.2);
    })
    .text(function(data) {
        return data.abbr
    });

  //axis labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .text("Lacks Healtcare(%)");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top})`)
    .text("In Poverty (%)");

});