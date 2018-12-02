// set the dimensions and margins of the graph
var margin = {top: 100, right: 40, bottom: 30, left: 50},
    width = 450 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;


var color = ["rgba(16,199,194, 0.8)", "rgba(255, 207, 86, 0.8)","rgba(232, 116, 97, 0.8)"]
var base2 = d3.select("#reflectionGraph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

var triSvg = base2.append("g")
    .attr("transform",
          "translate(" + margin.left + "," + (margin.top + 50) + ")");


base2.append("text")
      .text("Happy")
      .attr("r", 5.5)
      .attr("y", 55)
      .attr("x", 110)
      .attr("fill", "#0FB5B1");


base2.append("circle")
      .attr("r", 5.5)
      .attr("cy", 50)
      .attr("cx", 100)
      .attr("fill", "#0FB5B1");


base2.append("text")
      .text("Naturel")
      .attr("r", 5.5)
      .attr("y", 55)
      .attr("x", 260)
      .attr("fill", "#FFCF56");


base2.append("circle")
      .attr("r", 5.5)
      .attr("cy", 50)
      .attr("cx", 250)
      .attr("fill", "#FFCF56");






triangles = [{size: 1000,
  x: 30, y:0,  fill: 0},{size: 500,
  x: 50, y:3.5, fill: 1},{size: 500,
  x: 70, y:3.5, fill: 2}, {size: 1000,
  x: 130, y:0,  fill: 0},{size: 500,
  x: 150, y:3.5, fill: 1},{size: 500,
  x: 170, y:3.5, fill: 2},{size: 1000,
  x: 230, y:0,  fill: 0},{size: 500,
  x: 250, y:3.5, fill: 1},{size: 500,
  x: 270, y:3.5, fill: 2}];


triangles2 = [{size: 1000,
  x: 30, y:0,  fill: 0},{size: 500,
  x: 50, y:3.5, fill: 1},{size: 500,
  x: 70, y:3.5, fill: 2}, {size: 1000,
  x: 130, y:0,  fill: 0},{size: 500,
  x: 150, y:3.5, fill: 1},{size: 500,
  x: 170, y:3.5, fill: 2},{size: 1000,
  x: 230, y:0,  fill: 0},{size: 500,
  x: 250, y:3.5, fill: 1},{size: 500,
  x: 270, y:3.5, fill: 2}];



//var arc = d3.symbol().type(d3.symbolTriangle).size(500);
//
var line = triSvg.selectAll('.path1')
  .data(triangles)
  .enter()
  .append('path')
  .attr("class", "path1")
  .attr('d', d3.symbol().type(d3.symbolTriangle).size(function(d){
    return d.size;
  }))
  .attr('fill', function(d){
    return color[d.fill];
  })
  .attr('stroke', 'none')
  .attr('transform', function(d) {
    return "translate(" + d.x + "," + d.y + ")";
  });


var line2 = triSvg.selectAll('.path2')
  .data(triangles2)
  .enter()
  .append('path')
  .attr("class", "path2")
  .attr('d', d3.symbol().type(d3.symbolTriangle).size(function(d){
    return d.size;
  }))
  .attr('fill', function(d){
    return color[d.fill];
  })
  .attr('stroke', 'none')
  .attr('transform', function(d) {
    return "translate(" + d.x + "," + (d.y + 100) + ")";
  });



