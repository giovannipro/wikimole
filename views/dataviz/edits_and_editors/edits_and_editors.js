/* -----------------------
main variables
------------------------- */

var w = window;
width = w.outerWidth,
height = width + (width*0.5);

var margin = {top: 50, right: 50, bottom: 50, left: 50},
nomargin_w = width - margin.left - margin.right ;
nomargin_h = height - margin.top - margin.bottom ;

var padding = width/100,
offset = padding*1.5,
bar_h = 5,
offset = padding*10;

var start_circle = padding*80,
start_label = padding*2;

var font_size = '0.7em';

var c_circle = '#9E9E9E'

var w_line = '0.5px',
c_line = '#9E9E9E',
c_tick = '#636362';

var x = 2;
var records = 177; 

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

d3.csv("../../data/20160227/edits_and_editors_2014_2015.csv", loaded);

function loaded (data){

	data.sort(function(a,b) {
		return a.edits_2015 - b.edits_2015;
		//return a.avg_size_2015 - b.avg_size_2015;

	});

	console.log(width + ',' + height)
	console.log(data)

	var max_edits = d3.max(data, function(d) { return +d.edits_2015} );
	var max_editors = d3.max(data, function(d) { return +d.unique_editors_2015 ;} );
	var max_size = d3.max(data, function(d) { return +d.avg_size_2015 ;} );

	var max_i_row_edits = d3.max(data, function(d) { return +d.i_row_edits_2015 ;} );


	console.log(max_edits)
	console.log(max_editors)
	console.log(max_size)

/* -----------------------
set axis
------------------------- */

	var x_edits = d3.scale.linear()
		.domain([0,max_edits])
        .range([0,nomargin_h-offset ]);

	var x_Axis = d3.svg.axis()
        .scale(x_edits)
        .ticks(10)
        .tickSize(-height + (margin.top*2) )
        .orient('top')
    typeof(x_Axis);

	var y_editors = d3.scale.linear()
		.domain([0,max_editors])
        .range([0,nomargin_h-offset]);

	var y_Axis = d3.svg.axis()
        .scale(y_editors)
        .ticks(10)
        .tickSize(-height + (margin.top*2) )
        .orient('top')
	typeof(out_Axis);

/* -----------------------
visualize grid
------------------------- */
/*
	var vl_in = plot.append('g')
		.attr('class','v_lines')
		.call(in_Axis)
	.selectAll('text')
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start")
        .attr('fill',c_tick)
        .attr("font-size",font_size)

	var vl_out = plot.append('g')
		.attr('class','v_lines')
		.call(out_Axis)
	.selectAll('text')
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start")
        .attr('fill',c_tick)
        .attr("font-size",font_size)

	// o_lines
	var o_lines = plot.append('g')
		.attr('class','o_lines')
		.attr('transform','translate(0,' + (bar_h-(bar_h/2.5)) + ')' )  

	for (var i=0; i<data.length; i++) { 
		if( i % 5 == 0 ){
       		o_lines.append('line')
			.attr('x1', 0)
			.attr('y1', i * ((height - margin.top - margin.bottom) / (data.length) ))
			.attr('x2', width - margin.top - margin.bottom)
			.attr('y2', i * ((height - margin.top - margin.bottom) / (data.length) )) 
			.attr('class','o_line')
			.attr('stroke',c_line)
			.attr('stroke-width',w_line)
    	}
	}

/* -----------------------
visualize elements
------------------------- */

/* --- size ------------  */
/* ----------------------  */

var article = plot.selectAll('.article')
	.data(data)
	.enter()
	.append('g')
	.attr('class','article')
	.attr("id",function (d,i) {
		return d.article
	})

// circle
article.append('circle')
	/*.attr('cx',function(d,i){
		return (nomargin_w * d.edits_2015) / max_edits
	})*/
	.attr('cx', start_circle)
	.attr('cy',function(d,i){
		//return (nomargin_h * d.edits_2015) / max_edits 
		return (( (nomargin_h-offset) * d.unique_editors_2015) / max_editors )
	})
	.attr('r',function(d,i){
		return Math.sqrt(d.avg_size_2015 / 3.14) / 1.5;
	})
	.attr('fill','none')
	.attr('stroke',function(d,i){
		if (d.community == 'true'){
			return 'red'
		}
		else{
			return 'green'
		}
	})

/* --- title ------------  */
/* ----------------------  */

// group
var titles = plot.selectAll('.titles')
	.data(data)
	.enter()
	.append('g')
	.attr('class','titles')
	.attr('transform',function(d,i){
		return 'translate(' 
			//+ ((( (nomargin_w - (start_circle + (padding*1))  ) * d.i_row_editors_2015  ) / max_i_row_edits )) * 10// edits_2015  edits_2015
			+ padding*60
			+ ',' 
			+ ((( (nomargin_h-offset) * d.unique_editors_2015) / max_editors   - (padding*7) ))
			+ ')'
	})

// title
titles.append('g')
	.attr('transform',function(d,i){
		//return	'translate(-' +  ((i*x) - x) + ',0)'
		return 'translate(-' + d.i_row_editors_2015*20 + ',0)'
	})
	.attr('class',function(d,i){
		return ((i*x) - x) 
	})
	.append('text')
    .attr('dy', '.20em')
    .attr('dx', '.20em')
	.text(function (d,i){
		return d.article
	})
	.attr("font-size",font_size)	
	.attr('transform','rotate(90)')

// user and edits
titles.append('g')
	.attr('transform',function(d,i){
		return 'translate(-' + d.i_row_editors_2015*20 + ',0)'
	})
	.attr('transform','rotate(-45)')
	.append('text')
	.attr('transform','translate(10,20)')
    .attr('dy', '.20em')
    .attr('dx', '.20em')	
	.text(function (d,i){
		return 'u: ' + d.unique_editors_2015 + ', ed:' + d.edits_2015
	})
	.attr('font-size',font_size)

// line (edits)
titles.append('g')
	/*.attr('transform',function(d,i){
		return	'translate(-' +  i*x + ',0)'
	})*/
	.append('line')
	.attr('class','edit')
	.attr('x1',function(d,i){
		return -(d.i_row_editors_2015*20 + 5)
	})
	.attr('y1',0)
	.attr('x2',function(d,i){
		return -(d.i_row_editors_2015*20 + 5)
	})
	.attr('y2',function(d,i){
		return   180 // (180 * d.edits_2015 / max_edits)  // (  ( (nomargin_h-offset) * d.unique_editors_2015) / max_editors ) * d.edits_2015 / max_edits 
	})
	.attr('stroke','red')

/* -----------------------
icons
------------------------- */

    // icons
titles.append('g')
	.attr('class','icons')
	.attr('transform',function(d,i){
		return 'translate(-' + d.i_row_editors_2015*20 + ',-13)'
	})
	
	// community/review	
	d3.selectAll(".icons").append('g')
		.append("use")
		.attr("xlink:href", function(d,i) {
			if (d.community === 'true') {
				if (d.review === 'true') {
					return '#comm_rev'
				}
				return '#comm'
			}
			else if (d.review === 'atrue') {
				return '#rev'
			}
			else {
				//return '#new'
			}
		})
		.attr("x", 0)
		.attr("y", 0)
		.attr('transform','scale(' + ((height - margin.top - margin.bottom) / (data.length) / 100)  + ')' )

	// new
	d3.selectAll(".icons").append('g') 
		.attr('transform',function(d,i){
			return 'translate(-' + d.i_row_editors_2015*0.03 + ',-13)'
		})
		.append("use")
		.attr("xlink:href", function(d,i) {
			if (d.new_articles === 'true') {
				return '#new'
			}
			else {
				//return '#new'
			}
		})
		.attr("x", 0)
		.attr("y", 0)
		.attr('transform','scale(' + ((height - margin.top - margin.bottom) / (data.length) / 100)  + ')' )
};



