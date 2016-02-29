/* -----------------------
main variables
------------------------- */

var w = window;

var width = w.outerWidth; 
height = width + (width*0.3);

var margin = {top: 50, right: 50, bottom: 50, left: 50};
var nomargin_w = width - margin ;

var padding = width/100,
offset = padding*1.5,
bar_h = 6;

var font_size = '0.6em';

var start_id = padding,
start_bubble = padding*5,
start_icon = padding*12,
start_label = padding*14,
start_bar = padding*38;

var c_bubble = '#35B7BB',
c_bar = 'black', // 5CB44E
c_line = 'black',
c_tick = '#636362'; 

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

d3.csv("../../data/20160227/edited_articles_14.csv", loaded); //edited_articles_15   edited_articles_14

function loaded (data){

	data.sort(function(a,b) {return b.edits-a.edits;});

	console.log(width + ',' + height)
	console.log(data)

	var max_x = d3.max(data, function(d) { return +d.edits} );
	console.log(max_x)

/* -----------------------
icons
------------------------- */

// new article
var defs = d3.select('#d3_plot').append("svg:defs")
    
/*
defs.append("marker")
    .attr("id","new_article")
    .append("circle")
    .attr('cx','40')
    .attr('cy','40')
    .attr('r','40')

defs.append("g")
    .attr("id","iconCustom")
	.append('path')
	.attr('width', 200)
	.attr('height', 200)
    //.attr("refX", 6 + 3)
    //.attr("refY", 2)
    //.attr("markerWidth", 6)
    //.attr("markerHeight", 4)
    .attr("orient", "auto")
    .attr("d","M3.5,2H2.7C3,1.8,3.3,1.5,3.3,1.1c0-0.6-0.4-1-1-1c-0.6,0-1,0.4-1,1c0,0.4,0.2,0.7,0.6,0.9H1.1C0.7,2,0.4,2.3,0.4,2.6v1.9c0,0.3,0.3,0.6,0.6,0.6h0.2c0,0,0,0.1,0,0.1v1.9c0,0.3,0.2,0.6,0.3,0.6h1.3c0.2,0,0.3-0.3,0.3-0.6V5.3c0,0,0-0.1,0-0.1h0.2c0.3,0,0.6-0.3,0.6-0.6V2.6C4.1,2.3,3.8,2,3.5,2z");

defs.append("g")
    .attr("id","new_art")
    .append('rect')
    .attr('width','100')
    .attr('height','100')
    .append('rect')
    .attr('width','300')
    .attr('height','400')
    .attr('fill','red')
*/

/* -----------------------
set axis
------------------------- */

	var x = d3.scale.linear()
		.domain([0,max_x])
        .range([start_bar,(width-(margin.left*2)) ]);

	var x_Axis = d3.svg.axis()
        .scale(x)
        .ticks(10)
        .tickSize(-height + (margin.top*2) )
        .orient('top')
    typeof(x_Axis);

/* -----------------------
visualize grid
------------------------- */

	// o_lines
	var o_lines = plot.append('g')
		.attr('class','o_lines')
		.attr('transform','translate(0,' + (-bar_h*2) +  ')' )  
		.call(x_Axis)
		.attr('fill',c_tick)

	for (var i=0; i<data.length; i++) { 
		if( i % 5 == 0 ){
       		o_lines.append('line')
			.attr('x1', 0)
			.attr('y1', i * ((height - margin.top - margin.bottom) / (data.length) ))
			.attr('x2', width - margin.top - margin.bottom)
			.attr('y2', i * ((height - margin.top - margin.bottom) / (data.length) )) 
			.attr('class','o_line')
			.attr('stroke',c_line)
    	}
	}

/* -----------------------
visualize elements
------------------------- */
	
	var article = plot.selectAll('.article')
		.data(data)
		.enter()
		.append('g')
		.attr('class','article')
		.attr("id",function (d,i) {
			return d.article_14
			console.log(d.lenght)
		})
		.attr('transform',function(d,i) {
			return 'translate(0,' + (((height-margin.bottom-margin.top) / (data.length) ) * i) + ')' // (i*padding)
		})		

	// index
	article.append('text')
        .attr('y', 0)
        .attr('x', start_id)
		.attr("font-size",font_size)
		.text(function (d,i){
			return i + 1
		})
		.attr('class','id')

	// size
	article.append('circle')
		.attr('class','bubble')
		.attr('cx',start_bubble)
		.attr('cy',0)
		.attr('r',function(d,i){
			return (Math.sqrt(d.avg_size/3.14))/20
		})
		.attr('fill',c_bubble)

    // icons
	var icons = article.append('g')
		.attr('class','icons')
		.attr('transform','translate(' + start_icon  + ',' + (-bar_h*2) +')' ) 
	
	// community/review	
	d3.selectAll(".icons").append("use") // svg .icons
		.attr("xlink:href", function(d,i) {
			if (d.community == 'true') {
				if (d.review == 'true') {
					return '#comm_rev'
				}
				return '#com'
			}
			else {
			}
		})
		.attr("x", 0)
		.attr("y", bar_h-(bar_h/2) )	
    	.attr('transform','scale(0.2)')
    	//.attr("width", padding*1)
	    //.attr("height", padding*1)
	    //.classed("iconPlain",true)

	// new
	d3.selectAll(".icons")
		.append('g')
		.attr('transform','translate('+ (-padding*1.5) + ',0)' ) 
		.append("use")
		.attr("xlink:href", function(d,i) {
			if (d.new_art == 'true') {
				return '#new'
			}
			else {
			}
		})
		.attr("x", 0)
		.attr("y", bar_h/2)	
		.attr('transform','scale(0.2)')
    	//.attr("width", padding*1)
	    //.attr("height", padding*1)

	// label
	article.append('text')
        .attr('y', 0)
        .attr('x', start_label)
		.text(function (d,i){
			return d.article
		})
		.attr('class','text')
		.attr("font-size",font_size)
		.append("circle")
		.attr("clip-path", "url(#new_article_2)") // .attr("marker-end"

	// edits
	article.append('rect')
        .attr('y', (-bar_h*1.2) )
        .attr('x', start_bar)
        .attr('width',function(d,i){
        	//return d.edits * 20
        	return ((width-start_bar-margin.left*2) * d.edits) / max_x
        })
        .attr('height', bar_h)
        .attr('fill',c_bar)

};



