// @TODO: YOUR CODE HERE!


var svgWidth = 960;
var svgHeight = 500;
var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  // Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);



 //Retrieve data from the CSV file and execute everything below
d3.csv("./assets/data/data.csv").then(function(Data){
    Data.forEach(function(dataPoint) {
      // Parser through the data and cast 
        dataPoint.poverty = +dataPoint.date;

        dataPoint.obesityLow = +dataPoint.obesityLow;
        dataPoint.obesityHigh = +dataPoint.obesityHigh;
        dataPoint.obesityHigh = +dataPoint.obesityHigh;
      });
    console.log(Data);
 })  
    // id,state,abbr,poverty,povertyMoe,age,ageMoe,
    // income,incomeMoe,healthcare,healthcareLow,
    // healthcareHigh,obesity,obesityLow,obesityHigh,smokes,smokesLow,smokesHigh