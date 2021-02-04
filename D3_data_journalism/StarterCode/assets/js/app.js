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

  // Parameters

  var labelXaxis = "Poverty";
  var labelYaxis = "obesity"
  

// function used for updating X-Scale var upon click
 function xScale(Data, labelXaxis) {
   // create scales
   var xLinearScale = d3.scaleLinear()
   .domain([d3.min(Data, d=> d[labelXaxis])*0.9,  d3.max(data, d => d[labelXaxis])*1.1])
   .range([0, width]);
   return xLinearScale;
 }

 // function used for updating y-scale var upon click on axis label
function yScale(Data, labelYaxis) {
  // create scales
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d[labelYaxis])*0.9, d3.max(data, d => d[labelYaxis])*1.1])
    .range([height, 0]);

  return yLinearScale;
}



 //Retrieve data from the CSV file and execute everything below
d3.csv("./assets/data/data.csv").then(function(Data){
    Data.forEach(function(dataPoint) {

      // Parser through the data and cast as numbers
        dataPoint.poverty = +dataPoint.poverty;
        dataPoint.age = + dataPoint.age;
        dataPoint.income = + dataPoint.income; 
        dataPoint.healthcare = + dataPoint.healthcare;
        dataPoint.obesity = + dataPoint.obesity;
        dataPoint.smoke = + dataPoint.smoke;

        dataPoint.povertyMoe = +dataPoint.povertyMoe;
        dataPoint.ageMoe = + dataPoint.ageMoe;
        dataPoint.incomeMoe = + dataPoint.incomeMoe;
        dataPoint.obesityLow = +dataPoint.obesityLow;
        dataPoint.obesityHigh = +dataPoint.obesityHigh;
        dataPoint.smokesLow = +dataPoint.smokesLow;
        dataPoint.smokesHigh = +dataPoint.smokesHigh;
      });
    console.log(Data);
 })  
    // id,state,abbr,poverty,povertyMoe,age,ageMoe,
    // income,incomeMoe,healthcare,healthcareLow,
    // healthcareHigh,obesity,obesityLow,obesityHigh,smokes,smokesLow,smokesHigh

    // xLinearScale and yLinearScale 

    var xLinearScale = xScale(Data, labelXaxis);
    var yLinearScale = yScale(Data, labelYaxis)

    // Create initial axis functions

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //append x axis

     // append x axis
  var xAxis = chartGroup.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(bottomAxis);

// append y axis
var yAxis= chartGroup.append("g")
  // .attr("transform", `translate(0, 0-${height})`)
  .call(leftAxis);

// append initial circles
var circlesGroup = chartGroup.selectAll("circle")
  .data(Data)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d[labelXAxis]))
  .attr("cy", d => yLinearScale(d[labelYAxis]))
  .attr("r", 20)
  .classed("stateCircle", true);

// append initial circle labels
//missing the first states in the list

var circlesTextGroup= chartGroup.append("g")

var circlesText = circlesTextGroup.selectAll("text")
.data(Data)
.enter()
.append("text")
.attr("x", d => xLinearScale(d[labelXAxis]))
.attr("y", d => yLinearScale(d[labelYAxis]))
// .attr("dy", "1em")
.text(d => d.abbr)
.classed("stateText", true);
