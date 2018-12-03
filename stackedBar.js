rce: https://bl.ocks.org/mbostock/3886208
var n = 3, // number of samples
    m = 2; // number of series

var data = [[ 3600/22488, 14600/22488, 1360/22488]];
var data2 = [[4688/22488, 16000/22488,1800/22488]];
var margin = {top: 20, right: 30, bottom: 30, left: 20},
    width = 200 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var y2 = d3.scaleLinear()
    .domain([0, n])
    .rangeRound([height, 0])
    .nice();

var x2 = d3.scaleBand()
    .rangeRound([0, 50])
    .paddingInner(0.05)
    .align(0.1)
    .domain(d3.range(m));

var z = d3.scaleOrdinal()
    .range(["#7CE0DD", "#10C7C2", "#0EA395"]);

var z2 = d3.scaleOrdinal()
    .range(["#FFE4A2", "#FFD774", "#E8BD4F"]);


var svg2 = d3.select("#costBackGraph").append("svg")
    .attr("width", 200 + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom - 200)
    .attr("transform", "translate(" + (-20) + "," + 0 + ")")
    .append("g")
    .attr("transform", "translate(" + 20 + "," + (-250) + ")");

//console.log(data)

var count = 0;
svg2.append("text").text("$19650/year").attr("x", -15).attr("y", 300).style("fill", "#0EA395");
svg2.append("text").text("$22488/year").attr("x", 65).attr("y", 280).style("fill", "#E8BD4F");
svg2.append("text").text("Medical").attr("x", 30).attr("y", 320);
svg2.append("text").text("Living").attr("x", 32).attr("y", 380);
svg2.append("text").text("Doctor").attr("x", 30).attr("y", 440);
  
svg2.append("g").selectAll("g")
      .data(d3.stack().keys(d3.range(n))(data))
      .enter().append("g")
      .style("fill", function(d, i) { console.log(i); return z(i); })  
      .selectAll("rect")
      .data(function(d) { return d; })
      .enter().append("rect")
      .attr("x", function(d, i) { return x2(i); })
      .attr("y", function(d) { return y2(d[1]); })
      .attr("height", function(d) { return y2(d[0]) - y2(d[1]); })
      .attr("width", x2.bandwidth());

svg2.append("g").attr("class","option").selectAll("g")
      .data(d3.stack().keys(d3.range(n))(data2))
      .enter().append("g")
      .style("fill", function(d, i) { console.log(i); return z2(i); })  
      .selectAll("rect")
      .data(function(d) { return d; })
      .enter().append("rect")
      .attr("x", function(d, i) { return x2(i) + 80; })
      .attr("y", function(d) { return y2(d[1]); })
      .attr("height", function(d) { return y2(d[0]) - y2(d[1]); })
      .attr("width", x2.bandwidth());