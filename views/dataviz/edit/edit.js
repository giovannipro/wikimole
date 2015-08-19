var padding = 20;

var margin = {top: 20, right: 20, bottom: 80, left: 50},
    width = 1200 - margin.left - margin.right;
    //height = 100 - margin.top - margin.bottom;

var streamHeight = 60;

var dateFormat = d3.time.format("%d.%m.%y"); // %Y-%m-%d

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

d3.csv("../../data/edit_test1.csv", function(error, data) { // _test
    if (error) throw error;

    // set x and y domain
    var sizeDomain = d3.extent(data, function(d){return +d.difference }) //Math.round()
    var timeDomain = d3.extent(data, function(d){return dateFormat.parse(d.date)})

    // nest dataset for every article 
    data = d3.nest().key(function(d){return d.article}).entries(data)

    // sort in descending order of total amount of edits
    data.sort(function(a,b){
        var a = d3.sum(a.values, function(d){return +d.difference}) //size
        var b = d3.sum(b.values, function(d){return +d.difference}) //size
        return a - b
    })

    var height = (data.length * streamHeight) // - margin.top - margin.bottom

    console.log(data)

    // set x range
    var x = d3.time.scale()
        .domain(timeDomain)
        .range([0, width - margin.left - margin.right ]);

    // set y range
    var y = d3.scale.ordinal()
        .domain(data.map(function(d){return d.key}))
        .rangePoints([0, height], 1 ); // 10 20

    // set x axis
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom') //bottom
        //.ticks(d3.time.months,12)
        .ticks(d3.time.years, 1)
        .tickFormat(d3.time.format('%y'))
        .tickSize(height)
        .tickSubdivide(true)
        //.tickFormat(null)
        //.ticks(d3.time.years,1)
        //d3.time.format('%I'))
        //.ticks(40)
        //.ticks(d3.time.years,1)
        //.tickValues(d3.range(20, 80, 4))
        //.tickValues([1, 2, 3, 5, 8, 13, 21])
        //.tickPadding(8)

    // set y axis  
    var yAxis = d3.scale.linear()
        .domain(sizeDomain)
        .range([0, height - margin.top - margin.bottom]); //0

    var area = d3.svg.area()
        .interpolate("linear") // bundle
        .x(function(d) { return x(dateFormat.parse(d.date)) }) 

        .y0(0)
        .y1(function(d) { return ( - yAxis(+d.difference) / 1 )   }); // ( yAxis(Math.round(+d.difference)) / 2) 

        //.y0(function(d) { return -yAxis(Math.round(+d.size)) / 2 })       // in the middle
        //.y1(function(d) { return yAxis(Math.round(+d.size)) / 2 /*-yAxis(Math.round(+d.difference)) / 10*/  });

        //.y0(0)
        //.y1(function(d) { return (yAxis(+d.difference)  / 50) })  // from 0


        //.y1(function(d) { return  yAxis(Math.round(+d.size))  / 10   })            // test 2
        //.y1(function(d) { return - x(+d.size) / 100  })        
        //.y0(function(d) { return (yAxis(Math.round(+d.size))  / 10) })             // test 3
        //.y1(function(d) { return - x(+d.size) / 100  })                         
        

    var svg = d3.select("#chart").append("svg")
        .attr("width", width + padding) //margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom ) 
        .attr('viewBox','0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom) ) // + width + ' ' + height)
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
        .attr("d", function(d){ return area(d.values) })


    /*var lines = path.select("g")
        .data(data)
        .enter()
        .append('g') */       

    var oline = svg.selectAll("line")
        .data(data)
        .enter()
        .append('line')
        .attr('x1', 0)
        .attr('x2', width - margin.left - margin.right)
        .attr("y1", function(d){return y(d.key)})
        .attr("y2", function(d){return y(d.key)})
        .attr("class","olines axis")
        .style("stroke", "blue")

    var text = svg.selectAll("text")
        .data(data)
        .enter().append("text")
        .attr("x", -10)
        .attr("dy",5)
        .attr("y", function(d){return y(d.key)})
        .style("font-size",14)
        .style("letter-spacing",1)
        .style("font-weight",200)
        .style("text-anchor","end")
        .text(function(d,i){return  ( (i + 1) + ': ' + d.key) })

    var legend = svg.append("g")
        .attr("class","legend");

    var vlines = legend.append("g")
        .attr("class","vlines axis")
        .call(xAxis)

})
    /*
        Interpolation:
        linear
        linear-closed
        step
        step-before
        basis
        basis-open
        basis-closed
        bundle
        cardinal
        cardinal-open
        cardinal-closed
    */


