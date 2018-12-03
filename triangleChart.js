// set the dimensions and margins of the graph
var margin = {top: 100, right: 40, bottom: 30, left: 50},
    width = 450 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;


var color = ["rgba(16,199,194, 0.8)", "rgba(255, 207, 86, 0.8)","rgba(232, 116, 97, 0.8)"]
var emotion = ["happy", "naturel","sad"];

var base2 = d3.select("#reflectionGraph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("transform",
          "translate(" + 60 + "," + 0 + ")");

var triSvg = base2.append("g")
    .attr("transform",
          "translate(" + (margin.left) + "," + (margin.top + 50) + ")");


base2.append("text")
      .text("Happy")
      .attr("class", "diagram-text")
      .attr("r", 5.5)
      .attr("y", 55)
      .attr("x", 100);


base2.append("circle")
      .attr("r", 5.5)
      .attr("cy", 50)
      .attr("cx", 90)
      .attr("fill", "#0FB5B1");


base2.append("text")
      .text("Naturel")
      .attr("class", "diagram-text")
      .attr("r", 5.5)
      .attr("y", 55)
      .attr("x", 200);


base2.append("circle")
      .attr("r", 5.5)
      .attr("cy", 50)
      .attr("cx", 190)
      .attr("fill", "#FFCF56");


base2.append("text")
      .text("Sad")
      .attr("class", "diagram-text")
      .attr("r", 5.5)
      .attr("y", 55)
      .attr("x", 300);


base2.append("circle")
      .attr("r", 5.5)
      .attr("cy", 50)
      .attr("cx", 290)
      .attr("fill", "#E87461");






triangles = [{size: 800,
  x: 30, y:0,  fill: 0},{size: 200,
  x: 55, y:6.5, fill: 1},{size: 100,
  x: 70, y:7.5, fill: 2}, {size: 100,
  x: 130, y:10.5,  fill: 0},{size: 700,
  x: 150, y:3.5, fill: 1},{size: 200,
  x: 170, y:8.5, fill: 2},{size: 100,
  x: 230, y:11.5,  fill: 0},{size: 100,
  x: 240, y:11.5, fill: 1},{size: 800,
  x: 265, y:3.5, fill: 2}];


triangles2 = [{size: 100,
  x: 30, y:11.5,  fill: 0},{size: 800,
  x: 50, y:3.5, fill: 1},{size: 100,
  x: 70, y:11.5, fill: 2}, {size: 790,
  x: 140, y:0,  fill: 0},{size: 200,
  x: 160, y:6.5, fill: 1},{size: 100,
  x: 170, y:7.5, fill: 2},{size: 100,
  x: 230, y:11.5,  fill: 0},{size: 100,
  x: 240, y:11.5, fill: 1},{size: 800,
  x: 265, y:3.5, fill: 2}];


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
    return "translate(" + (d.x + 30) + "," + d.y + ")";
  });

triSvg.append("text").attr("class","diagram-text").text("OPTION 1").attr("x", -50);


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
    return "translate(" + (d.x + 30) + "," + (d.y + 100) + ")";
  });

triSvg.append("text").attr("class", "path2 diagram-text").text("OPTION 2").attr("x", -50).attr("y", 100);

triSvg.append("text").attr("class", "ref-timeline text-tl")
.attr("y", height - 55)
.attr("x", 60)
.text("Early Stage")

triSvg.append("text").attr("class", "ref-timeline text-tl")
.attr("y", height - 55)
.attr("x", 150)
.text("Middle Stage")

triSvg.append("text").attr("class", "ref-timeline text-tl")
.attr("y", height - 55)
.attr("x", 260)
.text("Late Stage")

var tooltip = d3.select("body").append("div").attr("class", "toolTip");

triSvg.selectAll('path').on('mouseover', function (d){
  tooltip
              .style("left", (d3.event.pageX - 10) + "px")
              .style("top", (d3.event.pageY - 50) + "px")
              .html("<span>" + (d.size/10) + "% feel " + emotion[d.fill] + "</span>")
              .style("display", "inline").style("color", color[d.fill]);
                      
                      })
             .on('mouseout', function(){
                    tooltip.style("display", "none");
             });

d3.selectAll('.ref-timeline').attr("y", height - 155);
d3.selectAll('.path2').style("display", "none");