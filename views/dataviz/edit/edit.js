// main variables
var width = 600 
var height = 400
var rectPadding = 10

var margin = {top: 50, right: 0, bottom: 20, left: 0}

var anim_duration = 300

var parseDate = d3.time.format("%Y-%m-%d").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var area = d3.svg.area()
    .x(function(d) { return x(d.timestamp / 10000 ); })
    .y0(height)
    .y1(function(d) { return y(d.size / 10000 ); });



// <path class="area" d="M756498960000000,-3487200L756498960000000,-3487200L756498960000000,400L756498960000000,400Z" transform="translate(-100,-200)"></path>


/*

2007-01-29

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




// create a random array
var data = new Array();

for(var j=0; j<5; j++){
    data.push(5+parseInt(Math.random()*95));
}
console.log(data)

// SVG
var svg = d3.select('svg')
    .attr('viewBox','0 0 ' + width + ' 400') // + width + ' ' + height)
    .attr('class','svg_content')

/* Header
svg.append('text')
    .text('Responsive jumping chart')
    .attr('class', 'title')
    .attr('x', 0)
    .attr('y', 20)
*/  



d3.csv("../../data/edit_test.csv", function( error, data) {
    if (error) throw error;

    console.log(data)

    data.forEach(function(d) {
        d.timestamp = parseDate(d.timestamp);
        d.size = +d.size;
    });

    d3.select('.svg_content').append("path")
    .datum(data)
    .attr("class", "area")
    .attr("d", area)
    .attr('transform','translate(-100,-200)')

})


    //console.log(data.edits) //[0]
    /*
    for (k  in data) {
        var k_data = data[k];

        k_data.forEach(function(d_data) { 

            console.log(d_data[1])

            d_data.forEach(function( y , v ) {

                //console.log( y ) 

                    /*y.forEach(function( x  ) {

                        //console.log( x ) 

                        /*x_data.forEach(function(x) { 

                            //d.timestamp = parseDate(d.timestamp);
                            x.size =  +d[0] //['edit'][0];  +d.size;

                            //console.log(d[1]['edit'][0])

                            console.log(x)
                            console.log(x.size)
                        
                            //console.log(d.size)

                        })

                    })

            })

        })
    }

    //svg.selectAll('rect')
      //  .data()
        //.enter()
        svg.append('rect')
        .attr('height', function(d,i) {
            return (d.edit) //d.size
        })
        .attr('width', 20)






})


/*

// Lines
var bglines = svg.append('g')
    .attr('id', 'bglines_1')

bglines.append('line')
    .attr('x1', 0)
    .attr('x2', width)
    .attr('y1', margin.top) // 70
    .attr('y2', margin.top) // 70
    .attr('class', 'bglines')
bglines.append('line')
    .attr('x1', 0)
    .attr('x2', width)
    .attr('y1', height)
    .attr('y2', height)
    .attr('class', 'bglines')

var bglines = svg.append('g')
    .attr('id', 'bglines_2')
    
    for (var i=0; i<6; i++) {
        bglines.append('line')
        .attr('x1', 0)
        .attr('x2', width)
        .attr('y1', 70+i*60)
        .attr('y2', 70+i*60)
        .attr('class', 'bglines')
    }
*/

/*
// Bar text
var bartext = svg.append('g')
    .attr('id', 'bartext')

var bar_margin = (width / (i+1) ) /2    
    
    for (var i=0; i<data.length; i++) {
        bartext.append('text')
        .text(data[i]+'%')
        .attr('x', i*(width/data.length) +  bar_margin )
        .attr('y', height)
        .attr('id', 'columntext'+i)  //(i+1)) // +1 in order to avoid id='columtext0'  
        .attr('class', 'columntext')
        .style('fill-opacity', '0');
    }
*/

// Bars
var rectangle = svg.append('g')
    .attr('id', 'rectangle')

    for (var i=0; i<data.length; i++) {

        var randcolor = new Array();
            randcolor[0] = 150+parseInt(Math.random()*90);
            randcolor[1] = 150+parseInt(Math.random()*90);
            randcolor[2] = 150+parseInt(Math.random()*90);

        rectangle.append('rect')
            .attr('x', i*(width/data.length)+rectPadding)
            .attr('y', (height - margin.top - margin.bottom) - ((height - margin.top - margin.bottom)/100) * data[i] ) // -data[i]) //*3
            .attr('width', width/data.length-2*rectPadding)
            .attr('height',  ((height - margin.top - margin.bottom)/100) *  data[i]  )
            //.attr('rx', 10)
            //.attr('ry', 10)
            .attr('fill', 'rgb('+randcolor[0]+','+randcolor[1]+','+randcolor[2]+')')
            .attr('id', 'rect'+i)
            //.attr('onmouseover', 'showInfo(rect'+i+',columntext'+i+')')
            //.attr('onmouseout', 'hideInfo(rect'+i+',columntext'+i+')')
    }

/*

// animations
function showInfo(rectsel, textsel){

    d3.select(rectsel)
        .transition()
        .duration(anim_duration)
        .style('fill-opacity', '1')

    d3.select(textsel)
        .transition()
        .duration(anim_duration)
        .style('fill-opacity', '1')
        .attr('y', 60)
}

function hideInfo(rectsel, textsel){

    d3.select(rectsel)
        .transition()
        .duration(anim_duration)
        .style('fill-opacity', '.6')

    d3.select(textsel)
        .transition()
        .duration(anim_duration)
        .style('fill-opacity', '1')
        .attr('y', height + 20)
}

*/