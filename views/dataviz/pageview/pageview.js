/* -----------------------
main variables
------------------------- */

var w = window;

var width = w.outerWidth;
var height = 3000; //width + (width*0.3);

var margin = {top: 50, right: 50, bottom: 50, left: 50};
var nomargin_w = width - margin ;

var padding = width/100,
offset = padding*1.5,
bar_h = 6;

var streamHeight = 100;

var dateFormat = d3.time.format("%d.%m.%y");

var shift = 180;
var fontsize = 11;
var fontweight = 300;

/* -----------------------
set plot
------------------------- */

var svg = d3.select("#svg_container")
    .append("svg")
    .attr("viewBox", '0 0 ' + width + ' ' + (height) )

var plot = svg.append("g")
    .attr("id", "d3_plot")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

/* -----------------------
get data
------------------------- */

d3.csv("../../data/20160227/pageview.csv", loaded); 

function loaded (data){    
    // get data (it must to be ordered for article and in cronological order)
    //d3.csv("../../data/20160227/pageview.csv", function(error, data) { 
    //if (error) throw error;

    // set x and y domain
    var sizeDomain = d3.extent(data, function(d){return  +d.pageview })
    var timeDomain = d3.extent(data, function(d){return dateFormat.parse(d.date)})

    // nest dataset for every article 
    data = d3.nest().key(function(d){return d.article}).entries(data)

    // sort in descending order of total amount of edits
    data.sort(function(a,b){
        var a = d3.sum(a.values, function(d){return Math.abs(+d.pageview)  })
        var b = d3.sum(b.values, function(d){return Math.abs(+d.pageview)  })
        return a - b
    })

    console.log(data)
    console.log(width)
    console.log(height)

/* -----------------------
set axis
------------------------- */

    var height_stream = data.length * streamHeight

    // set x range
    var x = d3.time.scale()
        .domain(timeDomain)
        .range([0, width - margin.left - margin.right ]);

    // set y range
    var y = d3.scale.ordinal()
        .domain(data.map(function(d){return d.key}))
        .rangePoints([0, height_stream], 1 );

    // set x axis
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom')
        .ticks(d3.time.months, 1)
        .tickFormat(d3.time.format('%m'))
        .tickSize(height_stream)
        .tickSubdivide(true)

    // set y axis  
    var yAxis = d3.scale.linear()
        .domain(sizeDomain)
        .range([0, height_stream - margin.top - margin.bottom ]);

    var area = d3.svg.area()
        .interpolate("linear") // bundle
        .x(function(d) { return x(dateFormat.parse(d.date) ) }) 
        .y0(0)
        .y1(function(d) { return - (+d.pageview ) / 250  });

/* -----------------------
visualize elements
------------------------- */

    var pageview = plot.selectAll("path")
        .data(data)
        .enter()
        .append("path")
        .attr('class', function(d){
            return (d.key)
        })
        .attr("transform", function(d, i) { return "translate(" + shift + "," + (y(d.key) + padding )   + ")" }) // 
        .style("fill", "red")
        .style("stroke", "white")  
        .style("stroke-width", "1")
        .attr("d", function(d){ return area(d.values) })

    var text = svg.selectAll("text")
        .data(data)
        .enter().append("text")
        .attr("x", -10)
        .attr("dy",5)
        .attr("y", function(d){return y(d.key) + padding })
        .attr("transform", "translate("+ shift + ",0)")
        .style("font-size",fontsize)
        .style("font-weight",fontweight)
        .style("letter-spacing",1)
        .style("text-anchor","end")
        .text(function(d,i){return (d.key) })

    var oline = svg.selectAll("line")
        .data(data)
        .enter()
        .append('line')
        .attr('x1', 0)
        .attr('x2', width - margin.left - margin.right)
        .attr("y1", function(d){return y(d.key) + padding })
        .attr("y2", function(d){return y(d.key) + padding })
        .attr("transform", "translate("+ shift + ",0)")
        .attr("class","olines axis")
        .style("stroke", "#ccc")
        .style("stroke-width",1)

    var legend = svg.append("g")
        .attr("class","legend")
        .attr("transform", "translate("+ shift + ",0)")
        .style("font-size",fontsize)
        .style("font-weight",fontweight)

    var vlines = legend.append("g")
        .attr("class","vlines axis")
        .call(xAxis)                
    
}