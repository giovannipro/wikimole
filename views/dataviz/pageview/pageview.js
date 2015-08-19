var padding = 20;

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 1200 - margin.left - margin.right,
    height = 100 - margin.top - margin.bottom;

var streamHeight = 40;

var dateFormat = d3.time.format("%Y-%m-%d");

/*
    %a - abbreviated weekday name.
    %A - full weekday name.
    %b - abbreviated month name.
    %B - full month name.
    %c - date and time, as "%a %b %e %H:%M:%S %Y".
    %d - zero-padded day of the month as a decimal number [01,31].
    %e - space-padded day of the month as a decimal number [ 1,31]; equivalent to %_d.
    %H - hour (24-hour clock) as a decimal number [00,23].
    %I - hour (12-hour clock) as a decimal number [01,12].
    %j - day of the year as a decimal number [001,366].
    %m - month as a decimal number [01,12].
    %M - minute as a decimal number [00,59].
    %L - milliseconds as a decimal number [000, 999].
    %p - either AM or PM.
    %S - second as a decimal number [00,61].
    %U - week number of the year (Sunday as the first day of the week) as a decimal number [00,53].
    %w - weekday as a decimal number [0(Sunday),6].
    %W - week number of the year (Monday as the first day of the week) as a decimal number [00,53].
    %x - date, as "%m/%d/%Y".
    %X - time, as "%H:%M:%S".
    %y - year without century as a decimal number [00,99].
    %Y - year with century as a decimal number.
    %Z - time zone offset, such as "-0700".
    %% - a literal "%" character.
*/

d3.csv("../../data/pageview.csv", function(error, data) { // _test
    if (error) throw error;

/*
if (data.user == index.of(',')) {
    console.log('x')
}
*/


// set x and y domain
var sizeDomain = d3.extent(data, function(d){return +d.pageview }) //Math.round()
var timeDomain = d3.extent(data, function(d){return dateFormat.parse(d.date)})

// nest dataset for every article 
data = d3.nest().key(function(d){return d.article}).entries(data)

// sort in descending order of total amount of edits
data.sort(function(a,b){
    var a = d3.sum(a.values, function(d){return +d.pageview})
    var b = d3.sum(b.values, function(d){return +d.pageview})
    return a - b
})

var height = data.length * streamHeight

console.log(data)

// set x range
var x = d3.time.scale()
    .domain(timeDomain)
    .range([0, width - margin.left - margin.right ]);

// set y range
var y = d3.scale.ordinal()
    .domain(data.map(function(d){return d.key}))
    .rangePoints([10, height], 20 ); // 0  1  //  - margin.top - margin.bottom

// set x axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
    .ticks(d3.time.days, 1)
    .tickFormat(null)
    .tickSize(height)
      
// set y axis  
var yAxis = d3.scale.linear()
    .domain(sizeDomain)
    .range([0, height]);

/*
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
*/

var area = d3.svg.area()
    .interpolate("bundle")
    .x(function(d) { return x(dateFormat.parse(d.date)) })  // 
    //.y0(function(d) {return x(+d.size) })
    .y0(function(d) { return yAxis(Math.round(+d.size))  }) // - 
    .y1(function(d) { return - yAxis(Math.round(+d.size))   });

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr('viewBox','0 0 ' + width + ' ' + height ) // + width + ' ' + height)
    .attr('class','svg_content')

var path = svg.selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .attr('class', function(d){
        return (d.key)
    })
    .attr("transform", function(d, i) { return "translate(0," + y(d.key)  + ")"; })
    .style("fill", "blue")
    .style("stroke", "none")
    .style("stroke-width", "none")
    .attr("d", function(d){ return area(d.values)})

/*
var edit = svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr("cx", 300)
    //.attr("cy", 200)
    .attr("r", 20)
    /*.attr('cx', function (d,i) {
        return (d.size) ;
    })
    .attr('cy', function (d,i){
        return i * 1
    })
    //.attr('r', 30);
*/

var line = svg.selectAll("line")
    .data(data)
    .enter()
    .append('line')
    .attr('x1', 0)
    .attr('x2', width - margin.left - margin.right)
    .attr("y1", function(d){return y(d.key)})
    .attr("y2", function(d){return y(d.key)})
    /*.attr('y1',  function (d,i) {
        return ( height  - ( height - i ) ) * 100
    })
    .attr('y2',  function (d,i) {
        return ( height  - ( height - i ) ) * 100
    })*/
    .style("stroke", "blue")

    svg.selectAll("text")
        .data(data)
        .enter().append("text")
        .attr("x", 195)
        .attr("dy",3)
        .attr("y", function(d){return y(d.key)})
        .style("font-size",12)
        .style("letter-spacing",1)
        .style("font-weight",700)
        .style("text-anchor","end")
        .text(function(d,i){return  i + ': ' + d.key})

})
