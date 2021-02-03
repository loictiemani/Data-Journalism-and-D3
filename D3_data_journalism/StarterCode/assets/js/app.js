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
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
var parseTime = d3.timeParse("%d-%b")
d3.csv("./data.csv").then(function(Data){
    Data.forEach(function(dataPoint) {
        dataPoint.date = parseTime(dataPoint.date);
        dataPoint.morning = +dataPoint.morning;
        dataPoint.evening = +dataPoint.evening;
      });
    console.log(donutData);vv

    id,state,abbr,poverty,povertyMoe,age,ageMoe,
    income,incomeMoe,healthcare,healthcareLow,
    healthcareHigh,obesity,obesityLow,obesityHigh,smokes,smokesLow,smokesHigh