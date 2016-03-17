/* -----------------------
main variables
------------------------- */

var w = window;

var width = w.outerWidth;
var height = width + (width*0.2); //3000; //width + (width*0.3);

var margin = {top: 50, right: 50, bottom: 50, left: 50},
nomargin_w = width - (margin.left + margin.right),
nomargin_h = height - (margin.top + margin.bottom);

var padding = width/100,
offset = padding*1.5,
bar_h = 6;

var streamHeight = 20;

var dateFormat_edit = d3.time.format('%Y-%m-%d'); // 01.01.14 // %d-%m-%y"  // %d.%m.%y
var dateFormat_pageview = d3.time.format('%Y-%m-%d');

var shift = 180;
var fontsize = 11;
var fontweight = 300;

var n_art = 177; // 177 9

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

d3.csv("../../data/20160227/pageview.csv", loaded_pageview); // pageview_1   pageview
d3.csv("../../data/20160227/edit.csv", loaded_size); 

function loaded_pageview (data){

    // set x and y domain
    var sizeDomain = d3.extent(data, function(d){return  +d.pageview })
    var timeDomain = d3.extent(data, function(d){return dateFormat_pageview.parse(d.date)})

    var max_pageview = d3.max(data, function(d) { return +d.pageview} );

    // nest dataset for every article 
    data = d3.nest().key(function(d){return d.article}).entries(data)

    // sort in descending order of total amount of edits
    data.sort(function(a,b){
        var a = d3.sum(a.values, function(d){return Math.abs(+d.pageview)  })
        var b = d3.sum(b.values, function(d){return Math.abs(+d.pageview)  })
        return a - b
    })

    console.log(height)
    console.log(nomargin_h)

    console.log(data)
    console.log(max_pageview)


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
        .x(function(d) { return x(dateFormat_pageview.parse(d.date) ) }) 
        .y0(0)
        .y1(function(d) {
            //return  - (+d.pageview ) / 300
            return -(( ( (nomargin_h/n_art) * 20 ) * (+d.pageview )) / max_pageview ) 
        });

/* -----------------------
visualize elements
------------------------- */
    
    // articles
    var articles = plot.selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr('class','article')
        .attr('id',function(d,i){
            return (i+1) + '-' + d.key
        })
        .attr("transform", function(d, i) {
            return 'translate(' + shift + ',' +  ((nomargin_h/n_art)*i ) + ')'
        }) 

    /*
    articles.append('rect')
        .attr('x',0)
        .attr('y',0)
        .attr('width',10)
        .attr('height',(nomargin_h/n_art))
        .attr('class','shift_y')
    */

    // pageviews
    articles.append('g')
        .attr('class','pageviews')
        .append("path")
        //.attr("transform", function(d, i) { return "translate(" + shift + "," + (y(d.key) + padding )   + ")" }) // 
        .style("fill", "red")
        .style("stroke", "white") 
        .style("stroke-width", "1")
        .attr("d", function(d){ 
            return area(d.values) 
        })

    /*var text = svg.selectAll("text")
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
        .text(function(d,i){return (d.key) })*/

    /*var oline = svg.selectAll("line")
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
        .call(xAxis)   */           
}


function loaded_size(mydata) {

/* -----------------------
get data
------------------------- */

    // set x and y domain
    var sizeDomain = d3.extent(mydata, function(d){return  +d.size })
    var timeDomain = d3.extent(mydata, function(d){return dateFormat_edit.parse(d.timestamp)})

    var max_size = d3.max(mydata, function(d) { return +d.size} );

    // nest dataset for every article 
    mydata = d3.nest().key(function(d){return d.article}).entries(mydata)

    // sort in descending order of total amount of edits
    mydata.sort(function(a,b){
        var a = d3.sum(a.values, function(d){return Math.abs(+d.size)  })
        var b = d3.sum(b.values, function(d){return Math.abs(+d.size)  })
        return a - b
    })

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
        .x(function(d) { return x(dateFormat_edit.parse(d.timestamp) ) }) 
        .y0(0)
        .y1(function(d) {
            //return (+d.size ) / 260  
            return (( ( (nomargin_h/n_art) * 20 ) * (+d.size )) / max_size) 
        });

/* -----------------------
visualize elements
------------------------- */

    var size = plot.selectAll(".size")
        .data(mydata)
        .enter()
        .append("g")
        .attr('class','size')
        .attr('id', function(d,i){
            return (i+1) + '-' + d.key
        })
        .attr("transform", function(d, i) {
            return 'translate(' + shift + ',' +  ((nomargin_h/n_art)*i ) + ')'
        }) 
    .append("path")
        .style("fill", "green")
        .style("stroke", "white") 
        .style("stroke-width", "1")
        .attr("d", function(d){
            return area(d.values)
        })

    size.append('rect')
        .attr('x',0)
        .attr('y',0)
        .attr('width',10)
        .attr('height',(nomargin_h/n_art))
        .attr('class','shift_y')

}