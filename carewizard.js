// set the dimensions and margins of the graph
var margin = {top: 100, right: 40, bottom: 30, left: 50},
    width = 450 - margin.left - margin.right,
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

var svg = base.append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

function make_x_gridlines() {   
    return d3.axisBottom(x)
        .ticks(5)
}

// gridlines in y axis function
function make_y_gridlines() {   
    return d3.axisLeft(y)
        .ticks(5)
}

// Get the data
d3.csv("data/costs.csv", function(error, data) {
  if (error) throw error;

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, 30000]);

  
  // add the Y gridlines
  svg.append("g")     
      .attr("class", "grid")
      .call(make_y_gridlines()
          .tickSize(-width)
          .tickFormat("")
      )

  base.append("circle")
      .attr("r", 5.5)
      .attr("cy", 50)
      .attr("cx", 100)
      .attr("fill", "#FFCF56");

  base.append("text")
      .text("option1")
      .attr("r", 5.5)
      .attr("y", 55)
      .attr("x", 110)
      .attr("fill", "#FFCF56");

  base.append("text")
      .text("option2")
      .attr("r", 5.5)
      .attr("y", 55)
      .attr("x", 260)
      .attr("fill", "#0FB5B1");

  base.append("circle")
      .attr("r", 5.5)
      .attr("cy", 50)
      .attr("cx", 250)
      .attr("fill", "#0FB5B1");


  // Add the valueline path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

  svg.append("path")
      .data([data])
      .attr("class", "line2")
      .attr("d", valueline2);

  // Add the X Axis
  svg.append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSizeOuter(0));

  // Add the Y Axis
  svg.append("g")
      .attr("class", "yAxis")
      .call(d3.axisLeft(y).ticks(6).tickSizeOuter(0));

  svg.append("text")
      .attr("y", height + 20)
      .attr("x", 0)
      .text("early")

  svg.append("text")
      .attr("y", height + 20)
      .attr("x", 170)
      .text("middle")

  svg.append("text")
      .attr("y", height + 20)
      .attr("x", 360)
      .text("late")

  var focus2 = svg.append("g")
        .attr("class", "focus2")
        .style("display", "none");

    focus2.append("line")
        .attr("class", "x-hover-line2 hover-line2")
        .attr("y1", 0)
        .attr("y2", height);

    focus2.append("line")
        .attr("class", "y-hover-line2 hover-line2")
        .attr("x1", width)
        .attr("x2", width);

    focus2.append("circle")
        .attr("r", 5.5);

    focus2.append("text")
        .attr("x", 15)
        .attr("dy", ".31em");

  var focus = svg.append("g")
        .attr("class", "focus")
        .style("display", "none");
     focus.append("line")
        .attr("class", "x-hover-line hover-line")
        .attr("y1", 0)
        .attr("y2", height);

    focus.append("line")
        .attr("class", "y-hover-line hover-line")
        .attr("x1", width)
        .attr("x2", width);

    focus.append("circle")
        .attr("r", 5.5);
    focus.append("text")
        .attr("x", 15)
        .attr("dy", ".31em");



    svg.append("rect")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function() { focus.style("display", null); focus2.style("display", null);})
        .on("mouseout", function() { focus.style("display", "none"); focus2.style("display", "none"); })
        .on("mousemove", mousemove);

    function mousemove() {
      var x0 = x.invert(d3.mouse(this)[0]),
          i = bisectDate(data, x0, 1),
          d0 = data[i - 1],
          d1 = data[i],
          d = x0 - d0.date > d1.date - x0 ? d1 : d0;
      focus.attr("transform", "translate(" + x(d.date) + "," + y(d.value1) + ")");
      focus2.attr("transform", "translate(" + x(d.date) + "," + y(d.value2) + ")");
      
      focus.select("text")
        .text(function() { return "$ " + d.value1 + " /year"; })
        .attr("y", "30")
        .attr("x", "20")
        .style("fill", "#0FB5B1");

      focus2.select("text")
        .text(function() { return "$ " + d.value2 + " /year"; })
        .attr("y","-30")
        .attr("x", "20")
        .style("fill", "#FFCF56");

      focus.select(".x-hover-line").attr("y2", height - y(d.value1));
      focus.select(".y-hover-line").attr("x2", width + width);

      focus2.select(".x-hover-line").attr("y2", height - y(d.value2));
      focus2.select(".y-hover-line").attr("x2", width + width);
    }

});