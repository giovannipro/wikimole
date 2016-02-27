/* -----------------------
main variables
------------------------- */

var w = window;

var width = w.outerWidth; 
var height = 4000;
var rectPadding = 10;

var margin = {top: 50, right: 50, bottom: 50, left: 50};
var nomargin_w = width - margin ;

var padding = 10;
var bar_h = 8;

var start_id = padding;
var start_label = padding*5;
var start_in = padding*50;
var start_out = padding*52;

var set_out = 6;
var set_in = 4;

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

d3.csv("../../data/20160227/in_out_links.csv", loaded); // in_out_links

function loaded (data){

	data.sort(function(a,b) {return b.total_in-a.total_in;});

	console.log(width + ',' + height)
	console.log(data)

	var max_in = d3.max(data, function(d) { return +d.total_in;} );
	var max_out = d3.max(data, function(d) { return +d.total_out;} );
	//console.log(max_in)
	//console.log(max_out)
	//console.log(width-(margin.left*2)- (padding*52))

/* -----------------------
set axis
------------------------- */

	var x_in = d3.scale.linear()
		.domain([0,500])
        .range([start_in,(padding*35)]);

	var in_Axis = d3.svg.axis()
        .scale(x_in)
        .ticks(5)
        .tickSize(3)
        .orient('top')
	typeof(in_Axis);

	var x_out = d3.scale.linear()
		.domain([0,3770])
        .range([(padding*52),(width-margin.left*2)]);

	var out_Axis = d3.svg.axis()
        .scale(x_out)
        .ticks(10)
        .tickSize(-height + (margin.top*2) )
        //.outerTickSize(3)
        .orient('top')
        //.tickPadding(3)
        //.innerTickSize(1)
	typeof(out_Axis);

/* -----------------------
visualize grid
------------------------- */

	// v_lines
	/*var vl_in = plot.append('g')
		.attr('class','v_lines')
		.call(in_Axis);*/

	var vl_out = plot.append('g')
		.attr('class','v_lines')
		.call(out_Axis);

	// o_lines
	var o_lines = plot.append('g')
		.attr('class','o_lines')
		.attr('transform','translate(0,' + (bar_h/bar_h) + ')' )  

	for (var i=0; i<data.length; i++) {
		o_lines.append('line')
		.attr('x1', 0)
		.attr('y1', i * ((height - margin.top - margin.bottom) / (data.length) ))
		.attr('x2', width - margin.top - margin.bottom)
		.attr('y2', i * ((height - margin.top - margin.bottom) / (data.length) )) 
		.attr('class','o_line')
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
		})
		.attr('transform',function(d,i) {
			return 'translate(0,' + (((height-margin.bottom-margin.top) / (data.length) ) * i) + ')' // (i*padding)
		})	

	article.append('text')
        .attr('y', bar_h +bar_h)
        .attr('x', start_id)
        .attr('dy', '.20em')
        .attr('dx', '.20em')
		.text(function (d,i){
			return i + 1
		})
		.attr('class','id')

	article.append('text')
        .attr('y', bar_h+ bar_h)
        .attr('x', start_label)
        .attr('dy', '.20em')
        .attr('dx', '.20em')
		.text(function (d,i){
			return d.article
		})
		.attr('class','text')

/* --- in ---  */
/* ----------  */

	// article
	article.append('rect')
		.attr('class','art')
		.attr('x',function(d,i){
			return (padding*50) - (d.page_in/set_in)
		})
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (d.page_in/set_in)
		})
		.attr('height',bar_h)

	// user
	article.append('rect')
		.attr('class','user')
		.attr('x',function(d,i){
			return (padding*50) - (d.page_in/set_in) - (d.user_in/set_in)
		})
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (d.user_in/set_in)
		})
		.attr('height',bar_h)

	// category
	article.append('rect')
		.attr('class','category')
		.attr('x',function(d,i){
			return (padding*50) - (d.page_in/set_in) - (d.user_in/set_in) - (d.category_in/set_in)
		})
		.attr('y', bar_h )
		.attr('width',function(d,i){
			return (d.category_in/set_in)
		})
		.attr('height',bar_h)

	// template
	article.append('rect')
		.attr('class','template')
		.attr('x',function(d,i){
			return (padding*50) - (d.page_in/set_in) - (d.user_in/set_in) - (d.category_in/set_in) - (d.template_in/set_in)
		})
		.attr('y', bar_h)
		.attr('width',function(d,i){
			return (d.template_in/set_in)
		})
		.attr('height',bar_h)

	// portal
	article.append('rect')
		.attr('class','portal')
		.attr('x',function(d,i){
			return (padding*50) - (d.page_in/set_in) - (d.user_in/set_in) - (d.category_in/set_in) - (d.template_in/set_in) - (d.portal_in/set_in)
		})
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (d.portal_in/set_in)
		})
		.attr('height',bar_h)

	// benchmark
	article.append('rect')
		.attr('class','benchmark')
		.attr('x',function(d,i){
			return (padding*50) - d.total_in_2015/set_in
		})
		.attr('y',bar_h )
		.attr('width',2)
		.attr('height',bar_h)

/* --- out ---  */
/* ----------  */

	var out_link = article.append('g')
		.attr('class','out')
	
	// article
	out_link.append('rect')
		.attr('class','art')
		.attr('x',start_out)
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (d.page_out * (width-(margin.left*2)-start_out) / max_out )
		})
		.attr('height',bar_h)

	// user
	out_link.append('rect')
		.attr('class','user')
		.attr('x', function(d,i){
			return start_out + (d.page_out * (width-(margin.left*2)-start_out) / max_out )
		})
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (d.user_out * (width-(margin.left*2)-start_out) / max_out )
		})
		.attr('height',bar_h)

	// category
	out_link.append('rect')
		.attr('class','category')
		.attr('x',function(d,i){
			return start_out + ((d.page_out) * (width-(margin.left*2)-start_out) / max_out ) + ((d.user_out) * (width-(margin.left*2)-start_out) / max_out )
		})
		.attr('y', bar_h )
		.attr('width',function(d,i){
			return (d.category_out * (width-(margin.left*2)-start_out) / max_out )
		})
		.attr('height',bar_h)

	// template
	out_link.append('rect')
		.attr('class','template')
		.attr('x',function(d,i){
			return start_out + ((d.page_out) * (width-(margin.left*2)-start_out) / max_out ) + ((d.user_out) * (width-(margin.left*2)-start_out) / max_out ) + ((d.category_out) * (width-(margin.left*2)-start_out) / max_out )
		})
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (d.template_out * (width-(margin.left*2)-start_out) / max_out )
		})
		.attr('height',bar_h)

	// portal
	out_link.append('rect')
		.attr('class','portal')
		.attr('x', function(d,i){
			return start_out + ((d.page_out) * (width-(margin.left*2)-start_out) / max_out ) + ((d.user_out) * (width-(margin.left*2)-start_out) / max_out ) + ((d.category_out) * (width-(margin.left*2)-start_out) / max_out ) + (d.template_out * (width-(margin.left*2)-start_out) / max_out )
		})
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (d.portal_out * (width-(margin.left*2)-start_out) / max_out )
		})
		.attr('height',bar_h)

	// out - benchmark
	out_link.append('rect')
		.attr('class','benchmark')
		.attr('x',function(d,i){
			return start_out + (d.total_out_2015 * (width-(margin.left*2)-start_out) / max_out )
		})
		.attr('y',bar_h )
		.attr('width',2)
		.attr('height',bar_h)
		.attr('fill','red')  //none




	/*
	for (var i=(padding*52); i<=(padding*110); i=i+(padding)) {
		v_lines.append('line')
		.attr('x1',i)
		.attr('y1', (padding))
		.attr('x2', i)
		.attr("y2", height-(padding))
		.attr('class','v_line')
	}
	*/

	/*for (var j=25; j <= height-25; j=j+25) {
	    v_lines.append("svg:line")
	        .attr("x1", j)
	        .attr("y1", 25)
	        .attr("x2", j)
	        .attr("y2", height-25)
	        .style("stroke", "rgb(6,120,155)")
	        .style("stroke-width", 2);            
	};
	*/


};



