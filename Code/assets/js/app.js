// You need to create a scatter plot between two of the data variables 
// such as Healthcare vs. Poverty or Smokers vs. Age that represents each state with circle elements. 
// make sure you pull in the data from data.csv by using the d3.csv function.

// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 10,
  right: 30,
  bottom: 30,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Identify output and set the dimensions
var svg = d3.select("#scatter")
  .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth)
  .append("g")
    .attr("transform",
        "translate(" + chartMargin.left + "," + chartMargin.top + ")");


// load data
d3.csv("assets/data/data.csv").then(function(stateData) {
    // print the data
    console.log(stateData);

    // https://www.d3-graph-gallery.com/graph/scatter_basic.html
    // add X axis
    var x = d3.scaleBand()
        .domain(stateData.poverty)
        .range([0, chartWidth]);
    var xAxis = svg.append("g")
        .attr("transform", "translate(0," + chartHeight + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0,d3.max(stateData.age)])
        .range([ chartHeight, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // add dots
    svg.append('g')
    .selectAll("dot")
    .data(stateData)
    .enter()
    .append("circle")
        .attr("cx", function (d) { return x(d.poverty); } )
        .attr("cy", function (d) { return y(d.age); } )
        .attr("r", 10)
        // .style("stroke", "0000")
        .style("fill", "0000")
        .style("opacity", 0.25)

    // for fun
    // https://www.d3-graph-gallery.com/graph/scatter_buttonXlim.html
    // A function that update the plot for a given xlim value
    function updatePlot() {

    // Get the value of the button
    xlim = this.value

    // Update X axis
    x.domain([3,xlim])
    xAxis.transition().duration(1000).call(d3.axisBottom(x))

    // Update chart
    svg.selectAll("circle")
        .data(stateData)
        .transition()
        .duration(1000)
        .attr("cx", function (d) { return x(d.poverty); } )
        .attr("cy", function (d) { return y(d.age); } )
    }

    // Add an event listener to the button created in the html part
    d3.select("#buttonXlim").on("input", updatePlot )

}).catch(function(error) {
    console.log(error);
});





// Include state abbreviations in the circles.


// Create and situate your axes and labels to the left and bottom of the chart.
