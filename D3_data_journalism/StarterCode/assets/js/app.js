// @TODO: YOUR CODE HERE!


var svgWidth = 1000;
var svgHeight = 600;
var margin = {
  top: 20,
  right: 40,
  bottom: 90,
  left: 100
};

// Define Dimensions of the Chart Area
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
 function xScale(data, labelXaxis) {
   // create scales
   var xLinearScale = d3.scaleLinear()
   .domain([d3.min(data, d=> d[labelXaxis])*0.9,  d3.max(data, d => d[labelXaxis])*1.1])
   .range([0, width]);
   return xLinearScale;
 }

 // function used for updating y-scale var upon click on axis label
function yScale(data, labelYaxis) {
  // create scales
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d[labelYaxis])*0.9, d3.max(data, d => d[labelYaxis])*1.1])
    .range([height, 0]);

  return yLinearScale;
}
// function used for updating xAxis var upon click on axis label
function renderAxesX(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating yAxis var upon click on axis label
function renderAxesY(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale);

  yAxis.transition()
    .duration(1000)
    .call(leftAxis);

  return yAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, labelXaxis, newYScale, labelYaxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[labelXaxis]))
    .attr("cy", d => newYScale(d[labelYaxis]));

  return circlesGroup;
}

function renderCirclesText(circlesText, newXScale, labelXaxis, newYScale, labelYaxis) {

  circlesText.transition()
    .duration(1000)
    .attr("x", d => newXScale(d[labelXaxis]))
    .attr("y", d => newYScale(d[labelYaxis]));

  return circlesText;
}

// function used for updating circles group with new tooltip
function updateToolTip(labelXaxis, labelYaxis, circlesGroup) {

  if (labelXaxis === "poverty") {
    var labelX = "Poverty: ";
  }
  else if (labelXaxis ==="age"){
    var labelX = "Age: ";
  }
  else if (labelXaxis ==="income"){
    var labelX="Household Income: "
  }
  if (labelYaxis==="obesity"){
    var labelY="Obesity: "
  }
  else if (labelYaxis==="smokes"){
    var labelY="Smokes: "
  }
  else if (labelYaxis==="healthcare"){
    var labelY="Healthcare: "
  }

  var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([0, 0])
    .html(function(d) {
      return (`${d.state}<br>${labelX} ${d[labelXaxis]}<br>${labelY} ${d[labelYaxis]}`);
    });

  circlesGroup.call(toolTip)
    //mouseover event
  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data, this);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data, this);
    });

  return circlesGroup;
}


 //Retrieve data from the CSV file and execute everything below
d3.csv("./assets/data/data.csv").then(function(Data){
    Data.forEach(function(data) {

      // Parser through the data and cast as numbers
        data.poverty = +data.poverty;
        data.age = + data.age;
        data.income = + data.income; 
        data.healthcare = + data.healthcare;
        data.obesity = + data.obesity;
        data.smoke = + data.smoke;

      //   dataPoint.povertyMoe = +dataPoint.povertyMoe;
      //   dataPoint.ageMoe = + dataPoint.ageMoe;
      //   dataPoint.incomeMoe = + dataPoint.incomeMoe;
      //   dataPoint.obesityLow = +dataPoint.obesityLow;
      //   dataPoint.obesityHigh = +dataPoint.obesityHigh;
      //   dataPoint.smokesLow = +dataPoint.smokesLow;
      //   dataPoint.smokesHigh = +dataPoint.smokesHigh;
      //
     });
    console.log(Data);

    // id,state,abbr,poverty,povertyMoe,age,ageMoe,
    // income,incomeMoe,healthcare,healthcareLow,
    // healthcareHigh,obesity,obesityLow,obesityHigh,smokes,smokesLow,smokesHigh

    // xLinearScale and yLinearScale 
// xLinearScale and yLinearScale function above csv import

var xLinearScale = xScale(Data, labelXaxis);
var yLinearScale= yScale(Data, labelYaxis)

// Create initial axis functions
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

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
  .attr("cx", d => xLinearScale(d[labelXaxis]))
  .attr("cy", d => yLinearScale(d[labelXaxis]))
  .attr("r", 20)
  .classed("stateCircle", true);

// append initial circle labels
//missing the first states in the list

var circlesTextGroup= chartGroup.append("g")

var circlesText = circlesTextGroup.selectAll("text")
.data(Data)
.enter()
.append("text")
.attr("x", d => xLinearScale(d[labelXaxis]))
.attr("y", d => yLinearScale(d[labelYaxis]))
// .attr("dy", "1em")
.text(d => d.abbr)
.classed("stateText", true);
})  