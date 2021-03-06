// set the dimensions and margins of the graph
var margin = {top: 100, right: 40, bottom: 30, left: 50},
    width = 500 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%Y")
    bisectDate = d3.bisector(function(d) { return d.date; }).left;

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.value1); });

var valueline2 = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.value2); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var base = d3.select("#costGraph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

var lineSvg = base.append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

function make_x_gridlines() {   
    return d3.axisBottom(x)
        .ticks(8)
}

// gridlines in y axis function
function make_y_gridlines() {   
    return d3.axisLeft(y)
        .ticks(8)
}

// Get the data
d3.csv("data/costs.csv", function(error, data) {
  if (error) throw error;

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, 30000]);

  
  // add the Y gridlines
  lineSvg.append("g")    
      .attr("class", "grid")
      .call(make_y_gridlines()
          .tickSize(-width - 50)
          .tickFormat("")
      )


  base.append("text")
      .text("Annual Costs")
      .attr("class", "text-main-tl")
      .attr("y", 55)
      .attr("x", 200);

  base.append("circle")
  .attr("class", "option2")
      .attr("r", 5.5)
      .attr("cy", 55)
      .attr("cx", 390)
      .attr("fill", "#0FB5B1");

  base.append("text")
      .text("OPTION1")
      .attr("class", "diagram-text option2")
      .attr("y", 58)
      .attr("x", 400)
      .attr("fill", "#999999");

  base.append("text")
      .text("OPTION2")
      .attr("class", "diagram-text option2")
      .attr("r", 5.5)
      .attr("y", 78)
      .attr("x", 400)
      .attr("fill", "#999999");

  base.append("circle")
  .attr("class", "option2")
      .attr("r", 5.5)
      .attr("cy", 75)
      .attr("cx", 390)
      .attr("fill", "#FFCF56");


  // Add the valueline path.
  lineSvg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

  lineSvg.append("path")
      .data([data])
      .attr("class", "line2")
      .attr("d", valueline2);

  // Add the X Axis
 lineSvg.append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSizeOuter(0));

  // Add the Y Axis
  lineSvg.append("g")
      .attr("class", "yAxis")
      .call(d3.axisLeft(y).ticks(6).tickSizeOuter(0));

  lineSvg.append("text")
      .attr("class", "text-tl")
      .attr("y", height + 25)
      .attr("x", 0)
      .text("Early Stage")

  lineSvg.append("text")
      .attr("class", "text-tl")
      .attr("y", height + 25)
      .attr("x", 170)
      .text("Middle Stage")

  lineSvg.append("text")
      .attr("class", "text-tl")
      .attr("y", height + 25)
      .attr("x", 320)
      .text("Late Stage")

  var focus2 = lineSvg.append("g")
        .attr("class", "focus2")
        .style("display", "none");

    focus2.append("line")
        .attr("class", "x-hover-line2 hover-line2 option2")
        .attr("y1", 0)
        .attr("y2", height);


    focus2.append("circle")
        .attr("class", "option2")
        .attr("r", 5.5);

    focus2.append("text")
        .attr("class", "option2")
        .attr("x", 15)
        .attr("dy", ".31em");

  var focus = lineSvg.append("g")
        .attr("class", "focus")
        .style("display", "none");

     focus.append("line")
        .attr("class", "x-hover-line hover-line")
        .attr("y1", 0)
        .attr("y2", height);

    focus.append("circle")
        .attr("r", 5.5);
    focus.append("text")
        .attr("x", 15)
        .attr("dy", ".31em");



    lineSvg.append("rect")
        .attr("class", "overlay")
        .attr("width", width + 60)
        .attr("height", height)
        .on("mouseover", function() { focus.style("display", null); focus2.style("display", null);})
        .on("mouseout", function() { focus.style("display", "none"); focus2.style("display", "none"); })
        .on("mousemove", mousemove);

    d3.selectAll('.line2').style("display", "none");
    d3.selectAll('.option2').style("display", "none");

    function mousemove() {
      var x0 = x.invert(d3.mouse(this)[0]),
          i = bisectDate(data, x0, 1),
          d0 = data[i - 1],
          d1 = data[i],
          d = x0 - d0.date > d1.date - x0 ? d1 : d0;
      focus.attr("transform", "translate(" + x(d.date) + "," + y(d.value1) + ")");
      focus2.attr("transform", "translate(" + x(d.date) + "," + y(d.value2) + ")");
      
      focus.select("text")
        .text(function() { return "$" + d3.format(",.2r")(d.value1) + "/year"; })
        .attr("y", "30")
        .attr("x", "20")
        .style("fill", "#0FB5B1");

      focus2.select("text")
        .text(function() { return "$" + d3.format(",.2r")(d.value2) + "/year"; })
        .attr("y","-30")
        .attr("x", "20")
        .style("fill", "#FFCF56");

      focus2.select(".x-hover-line2").attr("y2", height - y(d.value2));
      

  
    }

});