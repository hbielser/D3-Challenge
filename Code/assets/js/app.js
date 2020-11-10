// You need to create a scatter plot between two of the data variables 
// such as Healthcare vs. Poverty or Smokers vs. Age that represents each state with circle elements. 
// make sure you pull in the data from data.csv by using the d3.csv function.

// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 630;

// Define the chart's margins as an object
var chartMargin = {
  top: 20,
  right: 40,
  bottom: 50,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Create SVG container
var svg = d3.select("#scatter")
  .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth)

// shift everything over by the margins
var chartGroup = svg.append("g")
    .attr("transform",
        `translate(${chartMargin.left}, ${chartMargin.top})`);

// load data
d3.csv("assets/data/data.csv").then(function(stateData) {
    // print the data
    console.log(stateData);

 
    //cast age values to numbers
    stateData.forEach(function(data) {
        data.age = +data.age; 
        data.poverty = +data.poverty;
    });

    // https://www.d3-graph-gallery.com/graph/scatter_basic.html
    // add X axis
    minPoverty = d3.min(stateData, data => data.poverty)
    console.log(minPoverty)

    maxPoverty = d3.max(stateData, data => data.poverty)
    console.log(maxPoverty)

    var x = d3.scaleLinear()
        .domain([(minPoverty) * .8, (maxPoverty) * 1.1])
        .range([0, chartWidth])
    chartGroup.append("g")
        .attr("transform", `translate(0,${chartHeight})`)
        .call(d3.axisBottom(x));


    // Add Y axis
    minAge = d3.min(stateData, data => data.age)
    console.log(minAge)

    maxAge = d3.max(stateData, data => data.age)
    console.log(maxAge)

    var y = d3.scaleLinear()
    .domain([minAge * .8 , maxAge * 1.1])
    .range([ chartHeight, 0]);
    chartGroup.append("g")
        .call(d3.axisLeft(y));

    // add dots
    markerGroup = chartGroup.selectAll("dot")
        .data(stateData)
        .enter()
        .append("circle")
            .attr("cx", d => x(d.poverty))
            .attr("cy", d => y(d.age))
            .attr("r", "12")
            .attr("font-weight", "bold")
            .style("fill", "lightblue")
            .classed("stateCircle", true);

    chartGroup.selectAll()
        .data(stateData)
        .enter()
        .append("text")
            .attr("font-size", "10px")
            .attr("x", d => x(d.poverty))
            .attr("y", d => y(d.age))
            .text(d => d.abbr)
            // .classed("stateText", True)
            .attr("text-anchor", "middle")
            .style("fill", "black")
            .classed("stateText", true)


    // y-axis labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - chartMargin.left)
        .attr("x", 0 - chartHeight/2)
        .attr("dy", "1em")
        .attr("value","property")
        .attr("class", "axisText")
        .attr("font-weight", "Bold")
        .text("Age");

    // x-axis labels
    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 40 })`)
        .attr("class", "axisText")
        .text("Poverty %")
        .attr("font-weight", "Bold");

        
    var toolTip = d3.tip()
        .attr("class", "tooltip d3-tip")
        .offset([40, 20])
        .html(function (d) {return(`${d.abbr}<br>${d.poverty}<br>${d.age}`)})

    markerGroup.call(toolTip)
    markerGroup.on("mouseover", function (d) {toolTip.show(d, this),attr("fill-color", "cream")})
        .on("mouseout", function (d) {toolTip.hide(d)});

    // for fun
    // https://www.d3-graph-gallery.com/graph/scatter_buttonXlim.html
    // A function that update the plot for a given xlim value
    // function updatePlot() {

    // // Get the value of the button
    // xlim = this.value

    // // Update X axis
    // x.domain([3,xlim])
    // xAxis.transition().duration(1000).call(d3.axisBottom(x))

    // // Update chart
    // svg.selectAll("circle")
    //     .data(stateData)
    //     .transition()
    //     .duration(1000)
    //     .attr("cx", function (d) { return x(d.poverty); } )
    //     .attr("cy", function (d) { return y(d.age); } )
    // }

    // // Add an event listener to the button created in the html part
    // d3.select("#buttonXlim").on("input", updatePlot )

}).catch(function(error) {
    console.log(error);
});





// Include state abbreviations in the circles.


// Create and situate your axes and labels to the left and bottom of the chart.
