/* -----------------------
main variables
------------------------- */

var w = window;

var width = w.outerWidth;
var height = width + (width*1.8); //3000; //width + (width*0.3);

var margin = {top: 50, right: 50, bottom: 50, left: 50};
var nomargin_w = width - margin ;

var padding = width/100,
offset = padding*1.5,
bar_h = 6;

var streamHeight = 20;

var dateFormat = d3.time.format('%Y-%m-%d');  // %d-%m-%y"

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

d3.csv("../../data/20160227/pageview.csv", loaded_pv);
d3.csv("../../data/20160227/edit.csv", loaded_size); 

function loaded_pv (data){

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
        .range([0, width - 300]); //margin.left - margin.right 

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
        .y1(function(d) { return - (+d.pageview ) / 260  });

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
        .style("stroke-width",0.5)

    var legend = svg.append("g")
        .attr("class","legend")
        .attr("transform", "translate("+ shift + ",0)")
        .style("font-size",fontsize)
        .style("font-weight",fontweight)

    var vlines = legend.append("g")
        .attr("class","vlines axis")
        .call(xAxis)              

}

function loaded_size(mydata) {

/* -----------------------
get data
------------------------- */

    // set x and y domain
    var sizeDomain = d3.extent(mydata, function(d){return  +d.size })
    var timeDomain = d3.extent(mydata, function(d){return dateFormat.parse(d.timestamp)})

    // nest dataset for every article 
    mydata = d3.nest().key(function(d){return d.article}).entries(mydata)

    // sort in descending order of total amount of edits
    /*mydata.sort(function(a,b){
        var a = d3.sum(a.values, function(d){return Math.abs(+d.size)  })
        var b = d3.sum(b.values, function(d){return Math.abs(+d.size)  })
        return a - b
    })
    */

    console.log(mydata)

/* -----------------------
set axis
------------------------- */

    var height_stream = mydata.length * streamHeight

    // set x range
    var x = d3.time.scale()
        .domain(timeDomain)
        .range([0, width - 300]); //margin.left - margin.right 

    // set y range
    var y = d3.scale.ordinal()
        .domain(mydata.map(function(d){return d.key}))
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
        .x(function(d) { return x(dateFormat.parse(d.timestamp) ) }) 
        .y0(0)
        .y1(function(d) { return (+d.size ) / 260  });

/* -----------------------
visualize elements
------------------------- */
    
    var pageview = plot.selectAll(".size")
        .data(mydata)
        .enter()
        .append('g')
        .attr('class','size')
        .append("path")
        .attr('class', function(d){
            return (d.key)
        })
        .attr("transform", function(d, i) { return "translate(" + shift + "," + (y(d.key) + padding )   + ")" }) // 
        .style("fill", "green")
        .style("stroke", "white") 
        .style("stroke-width", "1")
        .attr("d", function(d){ return area(d.values) })

    /*

    Remove no existing days
    Select only 2014 and 2015 data

    */  

}