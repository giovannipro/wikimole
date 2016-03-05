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

var start_circle = padding*12,
start_label = padding*15;

var font_size = '0.7em';

var c_circle = '#9E9E9E'

var w_line = '0.5px',
c_line = '#9E9E9E',
c_tick = '#636362';

var x = 10;
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
		return a.edits_2014 - b.edits_2014;
	});

	console.log(width + ',' + height)
	console.log(data)

	var max_edits = d3.max(data, function(d) { return +d.edits_2014} );
	var max_editors = d3.max(data, function(d) { return +d.unique_editors_2014 ;} );

	console.log(max_edits)
	console.log(max_editors)

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

var article = plot.selectAll('.article')
	.data(data)
	.enter()
	.append('g')
	.attr('class','article')
	.attr("id",function (d,i) {
		return d.article
	})

// 2014
article.append('circle')
	/*.attr('cx',function(d,i){
		return (nomargin_w * d.edits_2014) / max_edits
	})*/
	.attr('cx', start_circle)
	.attr('cy',function(d,i){
		//return (nomargin_h * d.edits_2014) / max_edits 
		return (( (nomargin_h-offset) * d.unique_editors_2014) / max_editors )
	})
	.attr('r',function(d,i){
		return Math.sqrt(d.avg_size_2014 / 3.14) / 1.5;
	})
	.attr('fill','none')
	.attr('stroke','green')

/* --- title ------------  */
/* ----------------------  */

console.log(((nomargin_w - (start_circle + (padding*1) ) ) * 10 ) / max_edits )

var title = plot.selectAll('.title')
	.data(data)
	.enter()
	.append('g')
	.attr('class','title')
	.attr('transform',function(d,i){
		return 'translate(' 
			+ /*((start_circle+(padding*10))*/ + (((nomargin_w - start_circle ) *d.edits_2014 ) / records )   //  max_edits
			+ ',' 
			+ ((( (nomargin_h-offset) * d.unique_editors_2014) / max_editors) + (padding*5) )   +')'
	})

title.append('g')
	.attr('transform',function(d,i){
		return	'translate(' + i*8 +',0)'
	})
	.append('text')
    .attr('dy', '.20em')
    .attr('dx', '.20em')
	.text(function (d,i){
		return d.article
	})
	.attr("font-size",font_size)	
	.attr('transform','rotate(-90)')

title.append('g')
	.attr('transform',function(d,i){
		return	'translate(' + i*8 +',0)'
	})
	.append('text')
    .attr('dy', '.20em')
    .attr('dx', '.20em')	
	.text(function (d,i){
		return d.unique_editors_2014 + ',' + d.edits_2014
	})
	.attr('font-size',font_size)

/* --- edits ------------  */
/* ----------------------  */

title.append('g')
	.attr('transform',function(d,i){
		return	'translate(' + i*8 +',0)'
	})
	.append('line')
	.attr('class','edit')
	.attr('x1',5)
	.attr('y1',0)
	.attr('x2',5)
	.attr('y2',function(d,i){
		return   -(180 * d.edits_2014 / max_edits)  // (  ( (nomargin_h-offset) * d.unique_editors_2014) / max_editors ) * d.edits_2014 / max_edits 
	})
	.attr('stroke','red')

/*
title.append('g')
	.attr('transform','translate(0,20)')
	.attr('class','edit')
	
d3.selectAll('.edit').append('text')
    .attr('dy', '.20em')
    .attr('dx', '.20em')	
	.text(function (d,i){
		return d.unique_editors_2014
	})
	.attr('transform','rotate(-90)')

title.append('text')
    .attr('dy', '.20em')
    .attr('dx', '.20em')
	.text(function (d,i){
		//return i + 1
		return d.article
	})
	.attr("font-size",font_size)	
	.attr('transform','rotate(-90)')

/*
	.append('g')
	.attr('class','title')
	//.attr('transform','rotate(90 100 100)')
	.attr('transform',function(d,i){
		return 'translate(100,'+ (( (nomargin_h-offset) * d.unique_editors_2014) / max_editors) + ')'
	})
	.attr('transform','rotate(90)')

d3.selectAll('.title').append('text')
    //.attr('y',0)
    .attr('dy', '.20em')
    .attr('dx', '.20em')
	.text(function (d,i){
		//return i + 1
		return d.article
	})
	.attr("font-size",font_size)

*/





// lines
/*article.append('line')
	.attr('class','line')
	.attr('x1',function(d,i){
		return (nomargin_w * d.edits_2014 ) / max_edits
	})
	.attr('y1',function(d,i){
		return  (nomargin_h * d.unique_editors_2014) / max_editors
	})
	.attr('x2',function(d,i){
		return (nomargin_w * d.edits_2014) / max_edits 
	})
	.attr('y2',function(d,i){
		return (nomargin_h * d.unique_editors_2014) / max_editors
	})
	.attr('stroke',c_line)
	.attr('stroke-width',1)
*/




	/*

	// article
	in_link.append('rect')
		.attr('class','issue')
		.attr('x',start_in)
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (d.issues * (start_icon-start_in-offset) / max_issue )
		})
		.attr('fill',c_issues)
		.attr('height',bar_h)

/*
	var article = plot.selectAll('.article')
		.data(data)
		.enter()
		.append('g')
		.attr('class','article')
		.attr("id",function (d,i) {
			return d.article_14
		})
		.attr('transform',function(d,i) {
			return 'translate(0,' + (((height-margin.bottom-margin.top) / (data.length) ) * i) + ')' 
		})	

	article.append('text')
        .attr('y', bar_h +bar_h)
        .attr('x', start_id)
        .attr('dy', '.20em')
        .attr('dx', '.20em')
		.text(function (d,i){
			return i + 1
		})
		.attr("font-size",font_size)
		.attr('class','id')

	article.append('text')
        .attr('y', bar_h+ bar_h)
        .attr('x', start_label)
        .attr('dy', '.20em')
        .attr('dx', '.20em')
		.text(function (d,i){
			return d.article
		})
		.attr("font-size",font_size)
		.attr('class','text')

/* --- issues  */
/* ----------  */
/*
var in_link = article.append('g')
		.attr('class','in')

	// article
	in_link.append('rect')
		.attr('class','issue')
		.attr('x',start_in)
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (d.issues * (start_icon-start_in-offset) / max_issue )
		})
		.attr('fill',c_issues)
		.attr('height',bar_h)

	// in - benchmark
	in_link.append('line')
		.attr('class','benchmark')
		.attr('x1',function(d,i){
			return start_in + (d.issues * (start_icon-start_in-offset) / max_issue )
		})
		.attr('y1',function(d,i){
			return bar_h+(bar_h)
		})
		.attr('x2',function(d,i){
			return start_in + (d.issues * (start_icon-start_in-offset) / max_issue )
		})
		.attr('y2',function(d,i){
			return bar_h
		})
		.attr('stroke',c_benchmark)
		.attr('stroke-width',1)

/* --- other features ---  */
/* ----------------------  */


/* -----------------------
icons
------------------------- */
/*
    // icons
	var icons = article.append('g')
		.attr('class','icons')
		.attr('transform','translate(' + start_icon  + ',' + (bar_h*0.5) +')' ) 
	
	// community/review	
	d3.selectAll(".icons").append('g')
		//.attr('transform','translate('+ (-padding*1.5) + ',0)' ) 
		.append("use")
		.attr("xlink:href", function(d,i) {
			if (d.community === 'true') {
				if (d.review === 'true') {
					return '#comm_rev'
				}
				return '#comm'
			}
			else if (d.review === 'true') {
				return '#rev'
			}
			else {

			}
		})
		.attr("x", 0)
		.attr("y", bar_h-(bar_h/2) )	
    	//.attr('transform','scale(0.2)')
		.attr('transform','scale(' + ((height - margin.top - margin.bottom) / (data.length) / 100)  + ')' )

	// new
	d3.selectAll(".icons").append('g')
		.attr('transform','translate('+ (-padding) + ',0)' ) 
		.append("use")
		.attr("xlink:href", function(d,i) {
			if (d.new_article === 'true') {
				return '#new'
			}
			else {
			}
		})
		.attr("x", 0)
		.attr("y", bar_h/2)	
		//.attr('transform','scale(0.2)')
		.attr('transform','scale(' + ((height - margin.top - margin.bottom) / (data.length) / 100)  + ')' )

*/

};



